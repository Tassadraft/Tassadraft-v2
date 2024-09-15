<script>
    import IconButton from "../shared/IconButton.svelte";
    import { showToast } from "../../service/toastService.js";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let selectedCard = null;
    export let deck;

    let cardFace = 0;
    let isBasicLand = false;
    let isCardInDeck = true;

    const handleIncrement = () => {
        if (!isCardInDeck) {
            deck.categories = deck.categories.map(categoryObject => {
                if (categoryObject.category.name === selectedCard.card.translation.mainType) {
                    categoryObject.cards = [...categoryObject.cards, selectedCard];
                }
                return categoryObject;
            });
        }
        selectedCard.quantity++;
        showToast(`1 ${selectedCard.card.translation.name} added to ${deck.name}`, 'success');
        deck = {...deck};
    };

    const handleDecrement = () => {
        if (selectedCard.quantity === 1) {
            selectedCard.quantity = 0;
            deck.categories = deck.categories.map(categoryObject => {
                categoryObject.cards = categoryObject.cards.filter(deckCard => deckCard.card.scryfallId !== selectedCard.card.scryfallId);
                return categoryObject;
            });
            showToast(`${selectedCard.card.translation.name} totally removed from the deck`, 'success');
            dispatch('cardRemoved');
        } else {
            selectedCard.quantity--;
            showToast(`1 ${selectedCard.card.translation.name} removed from the deck`, 'success');
        }
        deck = {...deck};
    };

    $: isBasicLand = selectedCard?.card?.keyWords?.includes('Basic') && selectedCard?.card?.keyWords?.includes('Land');
    $: isCardInDeck = deck.categories.some(categoryObject => categoryObject.cards.some(deckCard => deckCard.card.scryfallId === selectedCard.card.scryfallId));
</script>

{#if selectedCard?.card?.translation}
    <div class="flex flex-col gap-3">
        <div class="flex flex-row justify-center">
            <div class="relative group">
                <img class="w-64 {selectedCard.card.layout === 'transform' ? 'group-hover:opacity-50 transition-opacity duration-300' : ''} rounded-lg"
                     src={selectedCard.card.layout === 'transform' ? selectedCard.card.cardFaces[cardFace]?.imageUri?.normal : selectedCard.card.imageUri?.normal}
                     alt={selectedCard.card.layout === 'transform' ? selectedCard.card.cardFaces[cardFace]?.translation.name : selectedCard.card.translation.name}
                />
                {#if selectedCard.card.layout === 'transform'}
                    <div class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute top-3 right-3">
                            <IconButton
                                icon="exchange"
                                size={32}
                                on:click={() => cardFace = cardFace === 0 ? 1 : 0}
                            />
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex flex-col gap-2 justify-center">
            {#if selectedCard.card.layout === 'transform'}
                <div class="sm:hidden flex justify-center">
                    <IconButton
                        icon="exchange"
                        size={32}
                        on:click={() => cardFace = cardFace === 0 ? 1 : 0}
                    />
                </div>
            {/if}
            {#if isBasicLand}
                <div class="flex flex-row gap-3 justify-center">
                    <IconButton
                        icon="minus"
                        size={32}
                        on:click={handleDecrement}
                    />
                    <p class="dark:text-white">{selectedCard.quantity}</p>
                    <IconButton
                        icon="plus"
                        size={32}
                        disabled={!isBasicLand}
                        on:click={handleIncrement}
                    />
                </div>
            {:else}
                <div class="flex justify-center">
                    <IconButton
                        icon="trash"
                        size={32}
                        on:click={handleDecrement}
                    />
                </div>
            {/if}
        </div>
    </div>
{/if}
