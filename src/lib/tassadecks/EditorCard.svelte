<script>
    import IconButton from "../shared/IconButton.svelte";
    import { asDroppable } from 'svelte-drag-and-drop-actions';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let cardObject = {card: {}};
    export let showCardModal = false;
    export let index = -1;
    export let categoryIndex = -1;
    export let selectedCard = {};
    export let draggedCard = {card: {}};
    export let hoveredCategoryIndex = -1;
    export let hoveredCardIndex = -1;
    export let deck = {};
    export let addCardRequest = async () => {};

    let cardFace = 0;
    let isBasicLand = cardObject?.card?.keyWords?.includes('Basic') && cardObject?.card?.keyWords?.includes('Land');
    let isTransforming = cardObject?.card?.layout === 'transform';

    const handleIncrement = async (e) => {
        e.stopPropagation();
        const added = await addCardRequest(cardObject.card);
        if (!added) {
            return;
        }
        cardObject.quantity++;
        deck = {...deck};
    };

    const handleDecrement = async (e) => {
        e.stopPropagation();
        dispatch('cardRemoved', cardObject);
    };

    const handleTransform = (e) => {
        e.stopPropagation();
        cardFace = cardFace === 0 ? 1 : 0;
    };

    const handleClick = () => {
        selectedCard = cardObject;
        showCardModal = true;
    };
</script>

<div
    role="button"
    tabindex="0"
    class="absolute group transition-transform duration-300"
    style="transform: translateY({((index - 1) * 30) + (categoryIndex === hoveredCategoryIndex && index > hoveredCardIndex ? 288 : 50)}px); z-index: {draggedCard.card.id === cardObject.card.id ? 2500 : index + 1};"
    on:mouseover={() => dispatch('hover')}
    on:mouseout={() =>dispatch('unHover')}
    on:focus={() => dispatch('hover')}
    on:blur={() => dispatch('unHover')}
    on:dragstart={() => dispatch('dragStart')}
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && handleClick()}
    use:asDroppable={{
        DataToOffer:{ 'card': cardObject },
        Operations:'copy'
    }}
>
    {#if isBasicLand || isTransforming}
        <div class="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    {/if}
    <img
        src={isTransforming ? cardObject?.card?.cardFaces[cardFace]?.imageUri?.normal : cardObject?.card?.imageUri?.normal}
        alt={cardObject.card.translation?.name}
        class="w-48 rounded-lg {isBasicLand || isTransforming ? 'group-hover:opacity-50 transition-opacity duration-300' : ''}"
    />
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
                    on:click={handleDecrement}
                />
                <p class="dark:text-white">{cardObject.quantity}</p>
                <IconButton
                    icon="plus"
                    size={32}
                    on:click={handleIncrement}
                />
            </div>
        {/if}
    </div>
</div>
