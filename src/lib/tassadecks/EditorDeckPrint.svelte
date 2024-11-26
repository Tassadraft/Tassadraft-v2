<script>
    import { jsPDF } from 'jspdf';
    import slugify from '../../service/slugifyService.js';
    import { t } from 'svelte-i18n';
    import Button from '../shared/Button.svelte';
    import Icon from '../shared/Icon.svelte';

    export let deck;

    const addCardImage = async (doc, imageUri, currentX, currentY, cardWidth, cardHeight) => {
        return fetch(imageUri)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch image: ${imageUri}`);
                }
                return res.blob();
            })
            .then((blob) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        doc.addImage(reader.result, 'JPEG', currentX, currentY, cardWidth, cardHeight);
                        doc.rect(currentX, currentY, cardWidth, cardHeight, 'S').setDrawColor(31, 41, 55);
                        resolve();
                    };
                    reader.readAsDataURL(blob);
                });
            });
    };

    const exportDeck = async () => {
        const doc = new jsPDF();

        const cardWidth = 63.5; // MTG card width in mm
        const cardHeight = 88.9; // MTG card height in mm
        const margin = 3.85; // Margin between cards in mm
        const pageWidth = doc.internal.pageSize.width; // Page width in mm
        const pageHeight = doc.internal.pageSize.height; // Page height in mm
        const cardsPerRow = Math.floor((pageWidth - 2 * margin) / (cardWidth + margin)); // Max cards per row
        const initialX = 2;
        const initialY = 8.5;

        let currentX = margin + initialX; // Initial X position
        let currentY = margin + initialY; // Initial Y position
        let cardsInRow = 0; // Cards in the current row

        const addAndPositionCard = async (imageUri) => {
            await addCardImage(doc, imageUri, currentX, currentY, cardWidth, cardHeight);
            cardsInRow++;

            // Move to the next position
            if (cardsInRow === cardsPerRow) {
                currentX = margin + 2;
                currentY += cardHeight + margin;
                cardsInRow = 0;
            } else {
                currentX += cardWidth + margin;
            }

            // Check if we need a new page
            if (currentY + cardHeight > pageHeight) {
                doc.addPage();
                currentX = margin + initialX;
                currentY = margin + initialY;
                cardsInRow = 0;
            }
        };

        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                // Handle transforming cards with multiple faces
                if (cardObject.print.layout !== 'flip' && cardObject.print.faces?.length > 1) {
                    for (let i = 0; i < cardObject.quantity; i++) {
                        for (const face of cardObject.print.faces) {
                            await addAndPositionCard(face.imageUri.normal);
                        }
                    }
                }

                // Handle regular cards
                if (cardObject.print.imageUri) {
                    for (let i = 0; i < cardObject.quantity; i++) {
                        await addAndPositionCard(cardObject.print.imageUri.normal);
                    }
                }
            }
        }

        doc.save(`${slugify(deck.name)}.pdf`);
    };
</script>

<Button on:click={exportDeck}>
    <div class="flex flex-row gap-1">
        <Icon name="download" />
        <p>{$t('common.download')}</p>
    </div>
</Button>
