<script>
    import IconButton from '../shared/IconButton.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let cardObject = { print: {} };
    export let categoryObject = { category: {} };
    export let showCardModal = false;
    export let index = -1;
    export let categoryIndex = -1;
    export let selectedCategory = {};
    export let hoveredCategoryIndex = -1;
    export let hoveredCardIndex = -1;
    export let deck = {};
    export let addCardRequest = async () => {};

    let flipped = false;
    let cardFace = 0;
    let isBasicLand = cardObject?.print?.keyWords?.includes('Basic') && cardObject?.print?.keyWords?.includes('Land');
    let isTransforming = cardObject?.print?.layout !== 'flip' && cardObject?.print?.faces?.length > 0;
    let isFlip = cardObject?.print?.layout === 'flip';

    const handleIncrement = async (e) => {
        e.stopPropagation();
        const added = await addCardRequest(cardObject.print);
        if (!added) {
            return;
        }
        cardObject.quantity++;
        deck = { ...deck };
    };

    const handleDecrement = async (e) => {
        e.stopPropagation();
        dispatch('cardRemoved', cardObject);
    };

    const handleTransform = (e) => {
        e.stopPropagation();
        if (isTransforming) {
            cardFace = cardFace === 0 ? 1 : 0;
        } else if (isFlip) {
            flipped = !flipped;
        }
    };

    const handleClick = () => {
        selectedCategory = categoryObject;
        showCardModal = true;
        dispatch('cardSelected', cardObject);
    };
</script>

<div
    role="button"
    tabindex="0"
    class="absolute group transition-transform duration-300"
    style="transform: translateY({(index - 1) * 30 +
        (categoryIndex === hoveredCategoryIndex && index > hoveredCardIndex ? 288 : 50)}px); z-index: 1001;"
    on:mouseover={() => dispatch('hover')}
    on:mouseout={() => dispatch('unHover')}
    on:focus={() => dispatch('hover')}
    on:blur={() => dispatch('unHover')}
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
    {#if isBasicLand || isTransforming || isFlip}
        <div class="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    {/if}
    <img
        src={isTransforming ? cardObject?.print?.faces[cardFace]?.imageUri?.normal : cardObject?.print?.imageUri?.normal}
        alt={cardObject.print.translation?.name}
        class="w-48 rounded-lg {isBasicLand || isTransforming || isFlip ? 'group-hover:opacity-50 transition-opacity duration-300' : ''} {flipped
            ? 'transform rotate-180'
            : ''}"
    />
    <div
        class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
        {#if isTransforming || isFlip}
            <div class="absolute top-8 right-3">
                <IconButton icon="exchange" on:click={handleTransform} />
            </div>
        {/if}
        {#if isBasicLand}
            <div class="flex flex-row gap-3 justify-center">
                <IconButton icon="minus" size={32} on:click={handleDecrement} />
                <p class="dark:text-white">{cardObject.quantity}</p>
                <IconButton icon="plus" size={32} on:click={handleIncrement} />
            </div>
        {/if}
    </div>
</div>
