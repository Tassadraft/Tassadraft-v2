<script>
    import IconButton from "../shared/IconButton.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let deck = {};
    export let card = {};

    let isCardInDeck = false;
    let icon = 'plus';

    const checkIfCardIsInDeck = (card) => {
        for (const categoryObject of deck.categories) {
            if (categoryObject.cards.find(cardObject => cardObject.card.scryfallId === card.scryfallId)) {
                return true;
            }
        }
        return false;
    }

    const handleAdd = () => {
        dispatch('add', card);
        isCardInDeck = true;
    }

    const handleDelete = () => {
        dispatch('delete', card);
        isCardInDeck = false;
    }

    $: {
        isCardInDeck = checkIfCardIsInDeck(card);
        icon = isCardInDeck ? 'minus' : 'plus'
    }
</script>

<div class="relative group">
    <!-- Container for image and button, `group` allows hover states to apply to child elements -->
    {#if card?.layout === 'transform'}
        <div class="relative flex gap-4">
            <div class="relative">
                <img src={card.cardFaces[0]?.imageUri.normal} alt={card.cardFaces[0]?.translation?.name}
                     class="w-64 flex-shrink-0 group-hover:opacity-50 transition-opacity duration-300"/>
                <div class="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <IconButton bind:icon on:click={isCardInDeck ? handleDelete : handleAdd}/>
                </div>
            </div>
            <div class="relative">
                <img src={card.cardFaces[1]?.imageUri.normal} alt={card.cardFaces[1]?.translation?.name}
                     class="w-64 flex-shrink-0 group-hover:opacity-50 transition-opacity duration-300"/>
                <div class="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <IconButton bind:icon on:click={isCardInDeck ? handleDelete : handleAdd}/>
                </div>
            </div>
        </div>
    {:else}
        <div class="relative">
            <img src={card.imageUri?.normal} alt={card.translation?.name}
                 class="w-64 flex-shrink-0 group-hover:opacity-50 transition-opacity duration-300"/>
            <div class="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconButton bind:icon on:click={isCardInDeck ? handleDelete : handleAdd}/>
            </div>
        </div>
    {/if}
</div>
