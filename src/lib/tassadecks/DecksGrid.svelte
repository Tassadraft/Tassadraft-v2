<script>
    import Link from '../shared/Link.svelte';
    import { t } from 'svelte-i18n';

    export let decks = [];
    export let displayOwner = false;
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {#each decks as deck}
        <Link
            href={`/decks/edit/${deck.id}`}
            className="bg-primary-800 rounded-lg p-4 text-white"
            style={deck.visuals.length
                ? `background-image: url(${deck.visuals[Math.floor(Math.random() * deck.visuals.length)]}); background-size: cover; background-position: center;`
                : ''}
        >
            <div class="bg-black/50 p-4 rounded-lg">
                <h2 class="text-xl font-bold">{deck.name}</h2>
                <p>
                    {deck.cards} {$t(`common.card.${deck.cards === 1 ? 'one': 'other'}`)}
                </p>
                <p>{$t('common.enabled')}: {$t(`common.${deck.enabled ? 'yes' : 'no'}`)}</p>
                <p>{$t('common.public')}: {$t(`common.${deck.public ? 'yes' : 'no'}`)}</p>
                {#if displayOwner}
                    <p>{$t('table.deck.owner')}: {deck.owner}</p>
                {/if}
            </div>
        </Link>
    {/each}
</div>
