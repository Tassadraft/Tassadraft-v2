<script>
    import IconButton from '../shared/IconButton.svelte';
    import { createEventDispatcher, onMount } from 'svelte';
    import Select from '../shared/Select.svelte';
    import Button from '../shared/Button.svelte';

    const dispatch = createEventDispatcher();

    export let selectedCard = null;
    export let selectedCategory = null;
    export let options = [];
    export let switching = false;

    let cardFace = 0;
    let isBasicLand = false;
    let isTransforming = false;
    let isFlip = false;
    let flipped = false;
    let selectedOption = null;

    const handleTransform = (e) => {
        e.stopPropagation();
        if (isTransforming) {
            cardFace = cardFace === 0 ? 1 : 0;
        } else if (isFlip) {
            flipped = !flipped;
        }
    };

    $: {
        isBasicLand = selectedCard?.print?.keyWords?.includes('Basic') && selectedCard?.print?.keyWords?.includes('Land');
        isTransforming = selectedCard?.print?.layout !== 'flip' && selectedCard?.print?.faces?.length > 0;
        isFlip = selectedCard?.print?.layout === 'flip';
        selectedOption = {
            value: selectedCategory.id,
            label: selectedCategory.category.name,
        };
    }
</script>

{#if selectedCard?.print?.translation}
    <div class="flex flex-col gap-3">
        <div class="flex flex-row justify-center">
            <div class="relative group">
                <img
                    class="w-64 {isTransforming || isFlip ? 'group-hover:opacity-50 transition-opacity duration-300' : ''} rounded-lg {flipped
                        ? 'transform rotate-180'
                        : ''}"
                    src={isTransforming ? selectedCard.print.faces[cardFace]?.imageUri?.normal : selectedCard.print.imageUri?.normal}
                    alt={isTransforming ? selectedCard.print.faces[cardFace]?.translation.name : selectedCard.print.translation.name}
                />
                {#if isTransforming || isFlip}
                    <div
                        class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <div class="absolute top-3 right-3">
                            <IconButton icon="exchange" size={32} on:click={handleTransform} />
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex flex-col gap-2 justify-center">
            <div class="w-full flex flex-row">
                <Select bind:options bind:selectedOption name="category" on:change={() => dispatch('changeCategory', selectedOption)} />
            </div>
            {#if isTransforming || isFlip}
                <div class="sm:hidden flex justify-center">
                    <IconButton icon="exchange" size={32} on:click={handleTransform} />
                </div>
            {/if}
            {#if isBasicLand}
                <div class="flex flex-row gap-3 justify-center">
                    <IconButton icon="minus" size={32} on:click={() => dispatch('cardDecrement', selectedCard)} />
                    <p class="dark:text-white">{selectedCard.quantity}</p>
                    <IconButton icon="plus" size={32} disabled={!isBasicLand} on:click={() => dispatch('cardIncrement', selectedCard)} />
                </div>
                <div class="flex justify-center">
                    <Button ariaLabel="Switch print" on:click={() => (switching = true)}>Switch print</Button>
                </div>
            {:else}
                <div class="flex justify-center gap-10">
                    <IconButton icon="trash" size={32} on:click={() => dispatch('cardDecrement', selectedCard)} />
                    <Button ariaLabel="Switch print" on:click={() => (switching = true)}>Switch print</Button>
                </div>
            {/if}
        </div>
    </div>
{/if}
