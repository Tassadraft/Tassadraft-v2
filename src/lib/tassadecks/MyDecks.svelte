<script>
    import Title from '../shared/Title.svelte';
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import axios from '../../axiosConfig.js';
    import Pagination from '../shared/Pagination.svelte';
    import DecksTable from '../tables/deck/DecksTable.svelte';
    import DecksGrid from './DecksGrid.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import DisplayingMode from '../shared/DisplayingMode.svelte';
    import Panel from '../shared/Panel.svelte';

    let myDecks = {};
    let displayingMode = 'list';

    onMount(async () => {
        const { data: decks } = await axios.get('/api/auth/reserved/decks/me');
        myDecks = decks;
    });

    const handleDeletedDeck = () => {
        myDecks.total -= 1;
        myDecks = { ...myDecks };
    };
</script>

<Menu />
<Title title="Choose a deck" />

<Panel>
    <div class="flex flex-row gap-5">
        <div class="flex justify-end w-full">
            <DisplayingMode bind:displayingMode />
        </div>
    </div>
</Panel>

<Panel>
    <Subtitle>{myDecks.total ?? 0} decks owned</Subtitle>
    {#if displayingMode === 'grid'}
        <DecksGrid bind:decks={myDecks.decks} />
    {:else if displayingMode === 'list'}
        <DecksTable bind:decks={myDecks.decks} on:deckDeleted={handleDeletedDeck} />
    {/if}
    <Pagination bind:paginatedObject={myDecks} baseUrl={`/api/auth/reserved/decks/me?languageCode=${localStorage.getItem('languageCode')}`} />
</Panel>
