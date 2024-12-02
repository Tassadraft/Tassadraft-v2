<script>
    import Subtitle from '../shared/Subtitle.svelte';
    import CardPrintItem from './CardPrintItem.svelte';
    import Pagination from '../shared/Pagination.svelte';
    import Modal from '../shared/Modal.svelte';
    import Button from '../shared/Button.svelte';
    import { SplideSlide } from '@splidejs/svelte-splide';
    import Carousel from '../shared/Carousel.svelte';
    import { t } from 'svelte-i18n';
    import EditorRelatedCardDetails from './EditorRelatedCardDetails.svelte';
    import axios from '../../axiosConfig.js';
    import { showToast } from '../../service/toastService.js';
    import IconInfo from '../shared/IconInfo.svelte';

    export let handleCardPrintsDisplay = () => {};
    export let deck;

    let relatedCards = [];
    let cardDetailsContainerRef;
    let selectedRelatedCard;
    let showRelatedModal = false;
    let paginatedCardPrints = { cards: [] };
    let isSelectedCardSwitchingPrint = true;
    let switchCardPrintBaseUrl = '';

    const switchRelatedCardPrintRequest = async (print) => {
        try {
            await axios.post(`/api/auth/reserved/cards/prints/${deck.id}/related/switch`, {
                printId: print.scryfallId,
            });
            showToast(`${print.translation.name} print switch to ${print.set.name}`);
            return true;
        } catch (e) {
            showToast(`Error while switching ${print.translation.name} print`, 'error');
            return false;
        }
    };

    const handleRelatedClicked = async (relatedPrint) => {
        selectedRelatedCard = relatedPrint;
        paginatedCardPrints = await handleCardPrintsDisplay(selectedRelatedCard.related);
        showRelatedModal = true;
    };

    const handleCloseRelatedCardDetails = () => {
        showRelatedModal = false;
        isSelectedCardSwitchingPrint = false;
    };

    const handleSwitchRelatedCardPrint = async (print) => {
        if (await switchRelatedCardPrintRequest(print)) {
            selectedRelatedCard.related.print = print;
            deck = { ...deck };
        }
        isSelectedCardSwitchingPrint = false;
    };

    $: {
        relatedCards = [];
        let count = 0;
        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                for (const relatedPrint of cardObject.relatedPrints) {
                    count++;
                    if (
                        !relatedCards.some(
                            (pushedRelatedCard) =>
                                pushedRelatedCard.base.print.oracleId === cardObject.print.oracleId &&
                                pushedRelatedCard.related.print.oracleId === relatedPrint.print.oracleId
                        )
                    ) {
                        relatedCards.push({ base: cardObject, related: relatedPrint });
                    }
                }
            }
        }
        relatedCards.sort((a, b) => a.related.print.translation.name.localeCompare(b.related.print.translation.name));
    }
</script>

<!-- TODO: replace by carousel after patch -->

{#if relatedCards.length}
    <div class="flex flex-row gap-3">
        <Subtitle className="my-5 font-bold text-xl">{$t('tassadecks.editor.related-cards.title')}</Subtitle>
        <IconInfo>{$t('tassadecks.editor.related-cards.description')}</IconInfo>
    </div>
    <div class="flex flex-row gap-3 flex-wrap pb-5">
        {#each relatedCards as relatedCard}
            <SplideSlide>
                <div class="flex justify-center">
                    <Button on:click={() => handleRelatedClicked(relatedCard)}>
                        <img
                            src={relatedCard.related.print.imageUri.normal}
                            alt={relatedCard.related.print.translation?.name}
                            class="h-auto rounded-lg w-48"
                        />
                    </Button>
                </div>
            </SplideSlide>
        {/each}
    </div>
{/if}

<!-- Related card modal -->
<Modal bind:showModal={showRelatedModal} on:close={handleCloseRelatedCardDetails} fullWidth={true}>
    <Subtitle slot="header">{selectedRelatedCard?.related?.print?.translation?.name}</Subtitle>
    {#if isSelectedCardSwitchingPrint}
        <div bind:this={cardDetailsContainerRef} class="flex flex-row flex-wrap gap-5 justify-center overflow-y-auto max-h-[75vh]">
            {#each paginatedCardPrints.cards as print}
                <CardPrintItem
                    bind:card={print}
                    bind:selectedCard={selectedRelatedCard}
                    on:choosePrint={(e) => handleSwitchRelatedCardPrint(e.detail)}
                />
            {/each}
        </div>
        <Pagination bind:paginatedObject={paginatedCardPrints} baseUrl={switchCardPrintBaseUrl} containerRef={cardDetailsContainerRef} />
    {:else}
        <EditorRelatedCardDetails bind:selectedRelatedCard bind:switching={isSelectedCardSwitchingPrint} />
    {/if}
</Modal>
