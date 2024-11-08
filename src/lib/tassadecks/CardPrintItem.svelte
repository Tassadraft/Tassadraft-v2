<script>
    import IconButton from '../shared/IconButton.svelte';
    import CardBadge from './CardBadge.svelte';
    import Button from "../shared/Button.svelte";

    export let card = {};
    export let selectedCard = {};

    let isActivePrint = false;
    let cardFace = 0;
    let isTransforming = false;
    let isFlip = false;
    let flipped = false;

    const checkIfPrintIsCurrent = (card) => {
        return card?.scryfallId === selectedCard?.card?.scryfallId;
    };

    const handleTransform = () => {
        if (isTransforming) {
            cardFace = cardFace === 0 ? 1 : 0;
        } else if (isFlip) {
            flipped = !flipped;
        }
    };

    const handleChoosePrint = () => {
        selectedCard.card = card;
        selectedCard = { ...selectedCard };
    };

    $: {
        isActivePrint = checkIfPrintIsCurrent(card);
        isTransforming = card?.layout !== 'flip' && card?.faces?.length > 0;
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
        {#if isActivePrint}
            <CardBadge>Current</CardBadge>
        {/if}
        <div
            class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            {#if isTransforming || isFlip}
                <div class="absolute top-8 right-3">
                    <IconButton icon="exchange" on:click={handleTransform} />
                </div>
            {/if}
            <div class="flex flex-row gap-3 justify-center">
                <Button ariaLabel="Choose print">Choose print</Button>
            </div>
        </div>
    </div>
</div>
