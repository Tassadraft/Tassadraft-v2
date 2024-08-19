<script>
    export let decks = [];
    export let displayOwner = false;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each decks as deck}
        <div class="bg-primary-800 rounded-lg p-4">
            <h2 class="text-xl font-bold">{deck.name}</h2>
            <p>{deck.cards.length} cards</p>
            <p>Enabled: {deck.enabled ? 'Yes' : 'No'}</p>
            <p>Public: {deck.public ? 'Yes' : 'No'}</p>
            {#if displayOwner}
                <p>Owner: {deck.owner}</p>
            {/if}
        </div>
    {/each}