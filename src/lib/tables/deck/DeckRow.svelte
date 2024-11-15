<script>
    import Switch from '../../shared/Switch.svelte';
    import Link from '../../shared/Link.svelte';
    import IconButton from "../../shared/IconButton.svelte";
    import { createEventDispatcher } from "svelte";

    export let deck;
    export let displayOwner = false;

    const dispatch = createEventDispatcher();
</script>

<tr class="group h-10 hover:bg-gray-300 hover:dark:bg-gray-900 transition-colors duration-300 border border-primary-700">
    <!-- Name Column with Link -->
    <td class="text-left border-r border-primary-700">
        <Link href={`/decks/edit/${deck.id}`} ariaLabel="Edit deck">
            <p class="text-xs truncate">{deck.name}</p>
        </Link>
    </td>

    <!-- Cards Column with Link -->
    <td class="text-center border-r border-primary-700">
        <Link href={`/decks/edit/${deck.id}`} ariaLabel="Edit deck">
            <p class="text-xs truncate">{deck.cards}</p>
        </Link>
    </td>

    <!-- Enabled Column with Link -->
    <td class="text-center border-r border-primary-700">
        <Link href={`/decks/edit/${deck.id}`} ariaLabel="Edit deck">
            <div class="flex justify-center">
                <Switch disabled={true} size="4" bind:value={deck.enabled} />
            </div>
        </Link>
    </td>

    <!-- Public Column with Link -->
    <td class="text-center border-r border-primary-700">
        <Link href={`/decks/edit/${deck.id}`} ariaLabel="Edit deck">
            <div class="flex justify-center">
                <Switch disabled={true} size="4" bind:value={deck.public} />
            </div>
        </Link>
    </td>

    <!-- Actions Column without Link, no hover effect -->
    {#if displayOwner}
        <td class="text-center border-primary-700">
            <Link href={`/decks/edit/${deck.id}`} ariaLabel="Edit deck">
                <p class="text-xs truncate">{deck.owner}</p>
            </Link>
        </td>
    {:else}
        <td class="text-center border-primary-700 hover:bg-inherit">
            <div class="mt-1">
                <IconButton icon="trash" on:click={() => dispatch('delete')} />
            </div>
        </td>
    {/if}
</tr>
