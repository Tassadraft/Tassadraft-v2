<script>
    import IconButton from '../shared/IconButton.svelte';
    import { showToast } from '../../service/toastService.js';
    import CardBadge from './CardBadge.svelte';
    import { t } from 'svelte-i18n';

    export let deck = {};
    export let card = {};
    export let addCardRequest = async () => {};
    export let removeCardRequest = async () => {};

    let cardObject = null;
    let cardFace = 0;
    let isTransforming = false;
    let isFlip = false;
    let flipped = false;
    let icon = 'plus';

    const checkIfCardIsInDeck = (deck, card) => {
        for (const categoryObject of deck.categories) {
            const deckCard = categoryObject.cards.find((deckCard) => deckCard?.print?.oracleId === card?.oracleId);
            if (deckCard) {
                return deckCard;
            }
        }
        return null;
    };

    const handleIncrement = async () => {
        let foundCategory = false;
        cardObject = checkIfCardIsInDeck(deck, card);

        if (cardObject) {
            const added = await addCardRequest(card);
            if (!added) {
                return;
            }
        } else {
            for (const categoryObject of deck.categories) {
                if (categoryObject.category.name === card?.translation.mainType) {
                    foundCategory = true;
                    if (categoryObject.cards.some((deckCard) => deckCard.print?.oracleId === card?.oracleId)) {
                        showToast($t('tassadecks.editor.search.already'), 'error');
                        return;
                    }
                    const response = await addCardRequest(card);
                    if (!response) {
                        return;
                    }

                    categoryObject.cards = [...categoryObject.cards, response.card];
                    categoryObject.cards.sort((a, b) => a.print.translation.name.localeCompare(b.print.translation.name));
                    deck = { ...deck };
                    return;
                }
            }

            if (!foundCategory) {
                const responseCard = await addCardRequest(card);
                if (!responseCard) {
                    return;
                }

                deck.categories = [
                    ...deck.categories,
                    { category: { name: card?.translation.mainType }, cards: [{ ...responseCard.card, quantity: 1 }] },
                ];
                deck.categories.sort((a, b) => {
                    if (a.category.name === 'Commander') {
                        return -1;
                    }
                    if (b.category.name === 'Commander') {
                        return 1;
                    }
                    return a.category.name.localeCompare(b.category.name);
                });
            }
        }
        deck = { ...deck };
    };

    const handleDecrement = async () => {
        cardObject = checkIfCardIsInDeck(deck, card);
        if (!cardObject) return;

        const removed = await removeCardRequest(card);
        if (!removed) return;

        if (cardObject.quantity === 1) {
            for (const categoryObject of deck.categories) {
                const index = categoryObject.cards.findIndex((deckCard) => deckCard?.print?.oracleId === card?.oracleId);
                if (index !== -1) {
                    categoryObject.cards.splice(index, 1);
                    break;
                }
            }
        } else {
            cardObject.quantity -= 1;
        }
        deck = { ...deck };
    };

    const handleTransform = () => {
        if (isTransforming) {
            cardFace = cardFace === 0 ? 1 : 0;
        } else if (isFlip) {
            flipped = !flipped;
        }
    };

    $: {
        cardObject = checkIfCardIsInDeck(deck, card);
        isTransforming = card?.layout !== 'flip' && card?.faces?.length > 1;
        icon = cardObject ? 'minus' : 'plus';
        isFlip = card?.layout === 'flip';
    }
</script>

<div class="group relative flex gap-4">
    <div class="relative">
        <img
            src={isTransforming ? card?.faces[cardFace]?.imageUri?.normal : card?.imageUri?.normal}
            alt={card?.translation?.name}
            class="w-48 rounded-lg group-hover:opacity-50 transition-opacity duration-300 {flipped ? 'transform rotate-180' : ''}"
        />
        {#if cardObject !== null}
            <CardBadge>{$t('badge.in-deck')}</CardBadge>
        {/if}
        <div
            class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            {#if isTransforming || isFlip}
                <div class="absolute top-8 right-3">
                    <IconButton icon="exchange" on:click={handleTransform} />
                </div>
            {/if}
            <IconButton bind:icon size={32} on:click={cardObject ? handleDecrement : handleIncrement} />
        </div>
    </div>
</div>
