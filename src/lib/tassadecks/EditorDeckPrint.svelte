<script>
    import { jsPDF } from "jspdf";
    import slugify from "../../service/slugifyService.js";
    import { t } from 'svelte-i18n';
    import Button from "../shared/Button.svelte";
    import Icon from "../shared/Icon.svelte";

    export let deck;

    const exportDeck = async () => {
        const doc = new jsPDF();

        const cardWidth = 63.5;
        const cardHeight = 88.9;
        const margin = 3.85;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const cardsPerRow = Math.floor((pageWidth - 2 * margin) / (cardWidth + margin));

        let currentX = margin + 2;
        let currentY = margin + 2;
        let cardsInRow = 0;

        const cardPromises = deck.categories.flatMap((categoryObject) =>
            categoryObject.cards.map((cardObject) => {
                if (cardObject && cardObject.print && cardObject.print.imageUri.normal) {
                    return fetch(cardObject.print.imageUri.normal)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`Failed to fetch image: ${cardObject.print.imageUri.normal}`);
                            }
                            return res.blob();
                        })
                        .then((blob) => {
                            return new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    doc.addImage(reader.result, 'JPEG', currentX, currentY, cardWidth, cardHeight);
                                    cardsInRow++;

                                    if (cardsInRow === cardsPerRow) {
                                        currentX = margin + 2;
                                        currentY += cardHeight + margin;
                                        cardsInRow = 0;
                                    } else {
                                        currentX += cardWidth + margin;
                                    }

                                    if (currentY + cardHeight > pageHeight) {
                                        doc.addPage();
                                        currentX = margin + 2;
                                        currentY = margin + 2;
                                        cardsInRow = 0;
                                    }
                                    resolve();
                                };
                                reader.readAsDataURL(blob);
                            });
                        })
                        .catch((error) => {
                            console.error(`Error processing card: ${cardObject.print.imageUri.normal}`, error);
                        });
                }
            })
        );
        await Promise.all(cardPromises);

        doc.save(`${slugify(deck.name)}.pdf`);
    };
</script>

<Button on:click={exportDeck}>
    <div class="flex flex-row gap-1">
        <Icon name="download"/>
        <p>{$t('common.download')}</p>
    </div>
</Button>
