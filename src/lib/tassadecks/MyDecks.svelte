<script>
    import Title from '../shared/Title.svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Pagination from '../shared/Pagination.svelte';
    import DecksTable from '../tables/deck/DecksTable.svelte';
    import DecksGrid from './DecksGrid.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import DisplayingMode from '../shared/DisplayingMode.svelte';
    import Panel from '../shared/Panel.svelte';
    import { t } from 'svelte-i18n';

    let myDecks = {};
    let displayingMode = 'list';
    let baseUrl = `/api/auth/reserved/decks/me?language=${localStorage.getItem('language')}`;

    onMount(async () => {
        const { data: decks } = await axios.get(baseUrl);
        myDecks = decks;
    });

    const handleDeletedDeck = () => {
        myDecks.total -= 1;
        myDecks = { ...myDecks };
    };
</script>

<Title title={$t('tassadecks.my-decks.title')} />

<Panel>
    <div class="flex flex-row gap-5">
        <div class="flex justify-end w-full">
            <DisplayingMode bind:displayingMode />
        </div>
    </div>
</Panel>

<Panel>
    <Subtitle>{myDecks.total} {$t(`tassadecks.owned-decks.${myDecks.total === 1 ? 'one' : 'other'}`)}</Subtitle>
    {#if displayingMode === 'grid'}
        <DecksGrid bind:decks={myDecks.decks} />
    {:else if displayingMode === 'list'}
        <DecksTable bind:decks={myDecks.decks} on:deckDeleted={handleDeletedDeck} />
    {/if}
    <Pagination bind:paginatedObject={myDecks} {baseUrl} />
</Panel>
