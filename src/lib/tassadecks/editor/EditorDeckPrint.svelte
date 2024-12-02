<script>
    import { jsPDF } from 'jspdf';
    import slugify from '../../../service/slugifyService.js';
    import { t } from 'svelte-i18n';
    import Button from '../../shared/Button.svelte';
    import Icon from '../../shared/Icon.svelte';
    import Modal from "../../shared/Modal.svelte";
    import Subtitle from "../../shared/Subtitle.svelte";
    import Switch from "../../shared/Switch.svelte";
    import Panel from "../../shared/Panel.svelte";
    import EditorDeckPrintOptionsItem from "./EditorDeckPrintOptionsItem.svelte";
    import EditorDeckPrintOptionsItemsList from "./EditorDeckPrintOptionsItemsList.svelte";

    export let deck;
    export let relatedCards;

    let showModal = false;

    let downloadDeckCards = true;
    let downloadRelatedPrints = false;
    let downloadTokens = false;
    let downloadEmblems = false;
    let downloadOtherRelated = false;

    let disabledDownloadTokens = true;
    let disabledDownloadEmblems = true;
    let disabledDownloadOtherRelated = true;

    let tokens = [];
    let emblems = [];
    let otherRelated = [];

    const handleRelatedSwitch = () => {
        if (!downloadRelatedPrints) {
            downloadTokens = false;
            downloadEmblems = false;
            downloadOtherRelated = false;
        }

        disabledDownloadTokens = !downloadRelatedPrints;
        disabledDownloadEmblems = !downloadRelatedPrints;
        disabledDownloadOtherRelated = !downloadRelatedPrints;
    }

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
        let totalCards = 0; // Track total cards processed
        let deckCardsCount = 0; // Count total cards in the deck

        deckCardsCount = deck.categories.reduce((acc, deckCategory) => {
            return acc + deckCategory.cards.reduce((a, card) => {
                if (card.print.layout !== 'flip' && card.print.faces?.length > 1) {
                    return a + card.quantity + 1;
                }
                return a + card.quantity;
            }, 0);
        }, 0);

        const addAndPositionCard = async (imageUri) => {
            totalCards++;
            const isLastCard = totalCards === deckCardsCount;

            // Add the card image to the current position
            await addCardImage(doc, imageUri, currentX, currentY, cardWidth, cardHeight);
            cardsInRow++;

            // Move to the next position
            currentX += cardWidth + margin;

            // If the row is full, reset X and move to the next row
            if (cardsInRow === cardsPerRow) {
                currentX = margin + initialX; // Reset X to initial margin
                currentY += cardHeight + margin; // Move Y to the next row
                cardsInRow = 0; // Reset cards in the row
            }

            // Check if adding another row exceeds the page height
            if (currentY + cardHeight > pageHeight) {
                // Add a new page only if it's not the last card
                if (!isLastCard) {
                    doc.addPage();
                    currentX = margin + initialX;
                    currentY = margin + initialY;
                    cardsInRow = 0; // Reset cards in the row for the new page
                }
            }
        };

        // Iterate over the deck's categories and cards
        for (const category of deck.categories) {
            for (const card of category.cards) {
                if (card.print.layout !== 'flip' && card.print.faces?.length > 1) {
                    // Handle double-faced cards
                    for (let i = 0; i < card.quantity; i++) {
                        for (const face of card.print.faces) {
                            await addAndPositionCard(face.imageUri.normal);
                        }
                    }
                } else if (card.print.imageUri) {
                    // Handle regular cards
                    for (let i = 0; i < card.quantity; i++) {
                        await addAndPositionCard(card.print.imageUri.normal);
                    }
                }
            }
        }

        doc.save(`${slugify(deck.name)}.pdf`);
    };

    $: {
        // Create maps for quick lookup of existing cards and their quantities
        const tokenMap = new Map(tokens.map(card => [card.related.print.oracleId, card]));
        const emblemMap = new Map(emblems.map(card => [card.related.print.oracleId, card]));
        const otherMap = new Map(otherRelated.map(card => [card.related.print.oracleId, card]));

        // Reset the arrays, but rebuild them by preserving existing quantities
        tokens = relatedCards
            .filter(card => card.related.print.layout === 'token')
            .map(card => {
                const existing = tokenMap.get(card.related.print.oracleId);
                return existing ? existing : { ...card, quantity: 1 }; // Preserve or initialize
            });

        emblems = relatedCards
            .filter(card => card.related.print.layout === 'emblem')
            .map(card => {
                const existing = emblemMap.get(card.related.print.oracleId);
                return existing ? existing : { ...card, quantity: 1 }; // Preserve or initialize
            });

        otherRelated = relatedCards
            .filter(card => !['token', 'emblem'].includes(card.related.print.layout))
            .map(card => {
                const existing = otherMap.get(card.related.print.oracleId);
                return existing ? existing : { ...card, quantity: 1 }; // Preserve or initialize
            });
    }

</script>

<Button on:click={() => showModal = true}>
    <div class="flex flex-row gap-1">
        <Icon name="download" />
        <p>{$t('common.download')}</p>
    </div>
</Button>

<Modal bind:showModal successText={$t('tassadecks.editor.download.modal.confirm')} closeText={$t('common.cancel')} on:success={exportDeck}>
    <Subtitle slot="header">{$t('tassadecks.editor.download.modal.title')}</Subtitle>
    <div class="flex flex-col items-start gap-3 m-3">
        <Switch size="5" label={$t('tassadecks.editor.download.modal.switch.deck-cards')} bind:value={downloadDeckCards} />
        {#if relatedCards.length}
            <Panel>
                <div class="flex flex-col items-start gap-3 m-1">
                    <Switch size="5" label={$t('tassadecks.editor.download.modal.switch.related-cards')} bind:value={downloadRelatedPrints} on:change={handleRelatedSwitch} />
                    <div class="flex flex-col items-start gap-3 m-3 transition-opacity duration-300 {downloadRelatedPrints ? '' : 'opacity-0'}">
                        {#if tokens.length}
                            <EditorDeckPrintOptionsItemsList
                                label={$t('tassadecks.editor.download.modal.switch.tokens')}
                                bind:list={tokens}
                                bind:switchValue={downloadTokens}
                                bind:disabled={disabledDownloadTokens}
                            />
                        {/if}
                        {#if emblems.length}
                            <EditorDeckPrintOptionsItemsList
                                label={$t('tassadecks.editor.download.modal.switch.emblems')}
                                bind:list={emblems}
                                bind:switchValue={downloadEmblems}
                                bind:disabled={disabledDownloadEmblems}
                            />
                        {/if}
                        {#if otherRelated.length}
                            <EditorDeckPrintOptionsItemsList
                                label={$t('tassadecks.editor.download.modal.switch.other-cards')}
                                bind:list={otherRelated}
                                bind:switchValue={downloadOtherRelated}
                                bind:disabled={disabledDownloadOtherRelated}
                            />
                        {/if}
                    </div>
                </div>
            </Panel>
        {/if}
    </div>
</Modal>
