<script>
    import Switch from '../../shared/Switch.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let deck;
    export let displayOwner = false;
</script>

<tr class="h-10">
    <td class="tr-first text-left border-r border-primary-700">
        <p class="text-xs truncate">{deck.name}</p>
    </td>
    <td class="text-center border-r border-primary-700">
        <p class="text-xs truncate">{deck.categories?.reduce((acc, category) => acc + category.cards.length, 0) || 0}</p>
    </td>
    <td class="text-center border-r border-primary-700">
        <div class="mt-2 flex justify-center">
            <Switch disabled={true} size="4" bind:value={deck.enabled} />
        </div>
    </td>
    <td class={`text-center ${displayOwner ? 'border-r border-primary-700' : ''}`}>
        <div class="mt-2 flex justify-center">
            <Switch disabled={true} size="4" bind:value={deck.public} />
        </div>
    </td>
    {#if displayOwner}
        <td class="text-center">
            <p class="text-xs truncate">{deck.owner}</p>
        </td>
    {/if}
</tr>
