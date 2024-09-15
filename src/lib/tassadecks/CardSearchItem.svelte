    <script>
        import IconButton from "../shared/IconButton.svelte";
        import CardSearchItemInDeckBadge from "./CardSearchItemInDeckBadge.svelte";
        import { showToast } from "../../service/toastService.js";

        export let deck = {};
        export let card = {};

        let cardObject = null;
        let cardFace = 0;
        let isTransforming = false;
        let isBasicLand = false;
        let icon = 'plus';

        const checkIfCardIsInDeck = (card) => {
            for (const categoryObject of deck.categories) {
                const deckCard = categoryObject.cards.find(deckCard => deckCard?.card?.scryfallId === card?.scryfallId);
                if (deckCard) {
                    return deckCard;
                }
            }
            return null;
        };

        const handleIncrement = () => {
            cardObject = checkIfCardIsInDeck(card);
            if (cardObject) {
                cardObject.quantity = (cardObject.quantity ?? 0) + 1;
            } else {
                cardObject = {card, quantity: 1};
                let foundCategory = false;
                for (const categoryObject of deck?.categories) {
                    if (categoryObject.category.name === card?.translation.mainType) {
                        foundCategory = true;
                        if (categoryObject.cards.find(cardObject => cardObject.card?.scryfallId === card?.scryfallId)) {
                            showToast('Card already in the deck', 'error');
                            return;
                        }
                        categoryObject.cards = [...categoryObject.cards, {card, quantity: 1}];
                        showToast(`${card?.translation?.name} added to the deck`, 'success');
                        cardObject = {...cardObject};
                        deck = {...deck};
                        return;
                    }
                }
                if (!foundCategory) {
                    deck.categories = [...deck.categories, {category: {name: card?.translation.mainType}, cards: [{card, quantity: 1}]}];
                    showToast(`${card?.translation?.name} added to the deck`, 'success');
                }
            }
            cardObject = {...cardObject};
            deck = {...deck};
        };

        const handleDecrement = () => {
            cardObject = checkIfCardIsInDeck(card);
            if (cardObject === null) {
                return;
            }
            if (cardObject.quantity === 1) {
                for (const categoryObject of deck.categories) {
                    const index = categoryObject.cards.findIndex(deckCard => deckCard?.card?.scryfallId === card?.scryfallId);
                    if (index !== -1) {
                        categoryObject.cards.splice(index, 1);
                        showToast(`${card?.translation?.name} removed from the deck`, 'success');
                        break;
                    }
                }
            } else {
                cardObject.quantity = cardObject.quantity - 1;
                showToast(`${card?.translation?.name} removed from the deck`, 'success');
            }
            deck = {...deck};
        };

        const handleTransform = () => {
            cardFace = cardFace === 0 ? 1 : 0;
        };

        $: {
            cardObject = checkIfCardIsInDeck(card);
            isTransforming = card?.layout === 'transform';
            isBasicLand = card?.keyWords?.includes('Basic') && card?.keyWords?.includes('Land');
            icon = cardObject ? 'minus' : 'plus';
        }
    </script>

    <div class="group relative flex gap-4">
        <div class="relative">
            <img
                src={isTransforming ? card?.cardFaces[cardFace]?.imageUri?.normal : card?.imageUri?.normal}
                alt={card?.translation?.name}
                class="w-48 rounded-lg group-hover:opacity-50 transition-opacity duration-300"
            />
            {#if cardObject !== null}
                <CardSearchItemInDeckBadge/>
            {/if}
            <div class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {#if isTransforming}
                    <div class="absolute top-8 right-3">
                        <IconButton
                            icon="exchange"
                            on:click={handleTransform}
                        />
                    </div>
                {/if}
                {#if isBasicLand}
                    <div class="flex flex-row gap-3 justify-center">
                        <IconButton
                            icon="minus"
                            size={32}
                            disabled={!cardObject?.quantity}
                            on:click={handleDecrement}
                        />
                        <p class="dark:text-white">{cardObject?.quantity ?? 0}</p>
                        <IconButton
                            icon="plus"
                            size={32}
                            on:click={handleIncrement}
                        />
                    </div>
                {:else}
                    <IconButton
                        bind:icon
                        size={32}
                        on:click={cardObject ? handleDecrement : handleIncrement}
                    />
                {/if}
            </div>
        </div>
    </div>
