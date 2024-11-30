<script>
    import Subtitle from "../shared/Subtitle.svelte";
    import CardPrintItem from "./CardPrintItem.svelte";
    import Pagination from "../shared/Pagination.svelte";
    import Modal from "../shared/Modal.svelte";
    import Button from "../shared/Button.svelte";
    import { SplideSlide } from "@splidejs/svelte-splide";
    import Carousel from "../shared/Carousel.svelte";

    export let handleCardPrintsDisplay = () => {};
    export let deck;

    let relatedCards = [];
    let cardDetailsContainerRef;
    let selectedRelatedCard;
    let showRelatedModal = false;
    let paginatedCardPrints = {cards: []};
    let isSelectedCardSwitchingPrint = true;
    let switchCardPrintBaseUrl = '';

    const handleRelatedClicked = async (relatedPrint) => {
        selectedRelatedCard = relatedPrint;
        paginatedCardPrints = await handleCardPrintsDisplay(selectedRelatedCard.related);
        console.log(paginatedCardPrints);
        showRelatedModal = true;
    };

    const handleCloseRelatedCardDetails = () => {
        showRelatedModal = false;
        // isSelectedCardSwitchingPrint = false;
    };

    $: {
        relatedCards = [];
        for (const categoryObject of deck.categories) {
            for (const cardObject of categoryObject.cards) {
                for (const relatedPrint of cardObject.relatedPrints) {
                    if (!relatedCards.some((pushedRelatedCard) => (pushedRelatedCard.base.print.oracleId === cardObject.print.oracleId) && (pushedRelatedCard.related.print.oracleId === relatedPrint.print.oracleId))) {
                        relatedCards.push({base: cardObject, related: relatedPrint});
                    }
                }
            }
        }
        relatedCards.sort((a, b) => a.related.print.translation.name.localeCompare(b.related.print.translation.name));
    }
</script>

{#if relatedCards.length}
    <Carousel>
        {#each relatedCards as relatedCard}
            <SplideSlide>
                <div class="flex flex-row justify-center">
                    <Button
                        on:click={() => handleRelatedClicked(relatedCard)}>
                        <img
                            src={relatedCard.related.print.imageUri.normal}
                            alt={relatedCard.related.print.translation?.name}
                            class="h-auto rounded-lg w-48"
                        />
                    </Button>
                </div>
            </SplideSlide>
        {/each}
    </Carousel>
{/if}

<!-- Related card modal -->
<Modal bind:showModal={showRelatedModal} on:close={handleCloseRelatedCardDetails} fullWidth={true}>
    <Subtitle slot="header">{selectedRelatedCard?.related?.print?.translation?.name}</Subtitle>
    {#if isSelectedCardSwitchingPrint}
        <div bind:this={cardDetailsContainerRef}
             class="flex flex-row flex-wrap gap-5 justify-center overflow-y-auto max-h-[75vh]">
            {#each paginatedCardPrints.cards as print}
                <CardPrintItem bind:card={print} bind:selectedCard={selectedRelatedCard}/>
            {/each}
        </div>
        <Pagination bind:paginatedObject={paginatedCardPrints} baseUrl={switchCardPrintBaseUrl}
                    containerRef={cardDetailsContainerRef}/>
    {:else}
    <!--  custom EditorCardDetails for related cards  -->
    {/if}
</Modal>
