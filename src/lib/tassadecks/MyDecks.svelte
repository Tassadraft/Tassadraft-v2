<script>
    import Title from "../shared/Title.svelte";
    import Menu from "../menu/Menu.svelte";
    import { onMount } from "svelte";
    import axios from "../../axiosConfig.js";
    import Pagination from "../shared/Pagination.svelte";
    import DecksTable from "../tables/deck/DecksTable.svelte";
    import DecksGrid from "./DecksGrid.svelte";
    import Subtitle from "../shared/Subtitle.svelte";
    import DisplayingMode from "../shared/DisplayingMode.svelte";

    let myDecks = {};
    let displayingMode = 'list';

    onMount(async () => {
        const {data: decks } = await axios.get('/api/auth/reserved/decks/me');
        myDecks = decks;
    });
</script>

<Menu />
<Title title="Choose a deck" />

<DisplayingMode bind:displayingMode />

<Subtitle>{myDecks.total ?? 0} decks owned</Subtitle>
{#if displayingMode === 'grid'}
    <DecksGrid bind:decks={myDecks.decks} displayOwner={true} />
{:else if displayingMode === 'list'}
    <DecksTable bind:decks={myDecks.decks} displayOwner={true} />
{/if}
<Pagination bind:paginatedObject={myDecks} baseUrl={`/api/auth/reserved/decks/me?languageCode=${localStorage.getItem('languageCode')}`} />
