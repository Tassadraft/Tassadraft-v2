<script>
    import Title from '../shared/Title.svelte';
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import axios from '../../axiosConfig.js';
    import Pagination from '../shared/Pagination.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import DecksTable from '../tables/deck/DecksTable.svelte';
    import DecksGrid from './DecksGrid.svelte';
    import DisplayingMode from '../shared/DisplayingMode.svelte';
    import Panel from '../shared/Panel.svelte';
    import { t } from 'svelte-i18n';

    let allDecks = {};
    let myDecks = {};
    let displayingMode = 'list';

    onMount(async () => {
        const { data } = await axios.get(`/api/decks?languageCode=${localStorage.getItem('languageCode')}`);
        allDecks = data.allDecks;
        myDecks = data.myDecks;
    });

    const handleDeletedDeck = () => {
        myDecks.total -= 1;
        myDecks = { ...myDecks };
    };
</script>

<Menu />
<Title title="All decks" />

<DisplayingMode bind:displayingMode />

{#if allDecks.total}
    <Panel>
        <Subtitle>{allDecks.total} {$t(`tassadecks.public-decks.${allDecks.total === 1 ? 'one' : 'other'}`)}</Subtitle>
        {#if displayingMode === 'grid'}
            <DecksGrid bind:decks={allDecks.decks} displayOwner={true} />
        {:else if displayingMode === 'list'}
            <DecksTable bind:decks={allDecks.decks} displayOwner={true} />
        {/if}
        <Pagination
            bind:paginatedObject={allDecks}
            baseUrl={`/api/auth/reserved/decks/public?languageCode=${localStorage.getItem('languageCode')}`}
        />
    </Panel>
{/if}
{#if myDecks.total}
    <Panel>
        <Subtitle>{myDecks.total} {$t(`tassadecks.owned-decks.${myDecks.total === 1 ? 'one' : 'other'}`)}</Subtitle>
        {#if displayingMode === 'grid'}
            <DecksGrid bind:decks={myDecks.decks} />
        {:else if displayingMode === 'list'}
            <DecksTable bind:decks={myDecks.decks} on:deckDeleted={handleDeletedDeck} />
        {/if}
        <Pagination bind:paginatedObject={myDecks} baseUrl={`/api/auth/reserved/decks/me?languageCode=${localStorage.getItem('languageCode')}`} />
    </Panel>
{/if}
