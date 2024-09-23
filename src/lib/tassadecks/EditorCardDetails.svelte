<script>
  import IconButton from '../shared/IconButton.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let selectedCard = null;

  let cardFace = 0;
  let isBasicLand = false;
  let isTransforming = false;

  $: {
    isBasicLand =
      selectedCard?.card?.keyWords?.includes('Basic') &&
      selectedCard?.card?.keyWords?.includes('Land');
    isTransforming = selectedCard?.card?.cardFaces?.length > 0;
  }
</script>

{#if selectedCard?.card?.translation}
  <div class="flex flex-col gap-3">
    <div class="flex flex-row justify-center">
      <div class="relative group">
        <img
          class="w-64 {isTransforming
            ? 'group-hover:opacity-50 transition-opacity duration-300'
            : ''} rounded-lg"
          src={isTransforming
            ? selectedCard.card.cardFaces[cardFace]?.imageUri?.normal
            : selectedCard.card.imageUri?.normal}
          alt={isTransforming
            ? selectedCard.card.cardFaces[cardFace]?.translation.name
            : selectedCard.card.translation.name}
        />
        {#if isTransforming}
          <div
            class="absolute inset-0 flex justify-center items-center flex-col gap-5 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div class="absolute top-3 right-3">
              <IconButton
                icon="exchange"
                size={32}
                on:click={() => (cardFace = cardFace === 0 ? 1 : 0)}
              />
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col gap-2 justify-center">
      {#if isTransforming}
        <div class="sm:hidden flex justify-center">
          <IconButton
            icon="exchange"
            size={32}
            on:click={() => (cardFace = cardFace === 0 ? 1 : 0)}
          />
        </div>
      {/if}
      {#if isBasicLand}
        <div class="flex flex-row gap-3 justify-center">
          <IconButton
            icon="minus"
            size={32}
            on:click={() => dispatch('cardDecrement', selectedCard)}
          />
          <p class="dark:text-white">{selectedCard.quantity}</p>
          <IconButton
            icon="plus"
            size={32}
            disabled={!isBasicLand}
            on:click={() => dispatch('cardIncrement', selectedCard)}
          />
        </div>
      {:else}
        <div class="flex justify-center">
          <IconButton
            icon="trash"
            size={32}
            on:click={() => dispatch('cardDecrement', selectedCard)}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}
