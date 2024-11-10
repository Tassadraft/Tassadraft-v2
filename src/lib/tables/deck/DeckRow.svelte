<script>
    import Switch from '../../shared/Switch.svelte';
    import Link from '../../shared/Link.svelte';

    export let deck;
    export let displayOwner = false;
</script>

<tr class="h-10 hover:bg-gray-300 hover:dark:bg-gray-800 transition-colors duration-300">
    <td class="tr-first text-left border-r border-primary-700 relative">
        <Link href={`/decks/edit/${deck.id}`} className="absolute inset-0 z-10" ariaLabel="Edit deck" />
        <p class="text-xs truncate z-20">{deck.name}</p>
    </td>

    <td class="text-center border-r border-primary-700 relative">
        <Link href={`/decks/edit/${deck.id}`} className="absolute inset-0 z-10" ariaLabel="Edit deck" />
        <p class="text-xs truncate z-20">
            {deck.cards}
        </p>
    </td>

    <td class="text-center border-r border-primary-700 relative">
        <Link href={`/decks/edit/${deck.id}`} className="absolute inset-0 z-10" ariaLabel="Edit deck" />
        <div class="mt-2 flex justify-center z-20">
            <Switch disabled={true} size="4" bind:value={deck.enabled} />
        </div>
    </td>

    <td class={`text-center ${displayOwner ? 'border-r border-primary-700' : ''} relative`}>
        <Link href={`/decks/edit/${deck.id}`} className="absolute inset-0 z-10" ariaLabel="Edit deck" />
        <div class="mt-2 flex justify-center z-20">
            <Switch disabled={true} size="4" bind:value={deck.public} />
        </div>
    </td>

    {#if displayOwner}
        <td class="text-center relative">
            <Link href={`/decks/edit/${deck.id}`} className="absolute inset-0 z-10" ariaLabel="Edit deck" />
            <p class="text-xs truncate z-20">{deck.owner}</p>
        </td>
    {/if}
</tr>
