<script>
    import Title from "../shared/Title.svelte";
    import Menu from "../menu/Menu.svelte";
    import { onMount } from "svelte";
    import axios from "../../axiosConfig.js";
    import Pagination from '../shared/Pagination.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import Icon from '../shared/Icon.svelte';
    import Button from '../shared/Button.svelte';
    import DecksTable from '../tables/deck/DecksTable.svelte';

    let allDecks = {};
    let myDecks = {};
    let displayingMode = 'grid';

    onMount(async () => {
        const { data } = await axios.get(`/api/decks?languageCode=${localStorage.getItem('languageCode')}`);
        console.log(data);
        allDecks = data.allDecks;
        myDecks = data.myDecks;
    });
</script>

<Menu />
<Title title="All decks" />

<div class="flex flex-row justify-end">
    <Button
            disabled={displayingMode === 'list'}
            customStyle={displayingMode === 'list'}
            className={displayingMode === 'list' ? 'text-primary-500': ''}
            iconButton={true} on:click={() => displayingMode = 'list'}>
        <Icon name="list" />
    </Button>
    <Button
            disabled={displayingMode === 'grid'}
            customStyle={displayingMode === 'grid'}
            className={displayingMode === 'grid' ? 'text-primary-500': ''}
            iconButton={true} on:click={() => displayingMode = 'grid'}>
        <Icon name="grid" />
    </Button>
</div>

{#if allDecks}
    <Subtitle>{allDecks.total ?? 0} public decks</Subtitle>
    {#if displayingMode === 'grid'}
        <p>grid</p>
    {:else if displayingMode === 'list'}
        <DecksTable bind:decks={allDecks.decks} displayOwner={false} />
    {/if}
    <Pagination bind:paginatedObject={allDecks} baseUrl={`/api/auth/reserved/decks/public?languageCode=${localStorage.getItem('languageCode')}`} />
{/if}
{#if myDecks}
    <Subtitle>{myDecks.total ?? 0} decks owned</Subtitle>
    {#if displayingMode === 'grid'}
        <p>grid</p>
    {:else if displayingMode === 'list'}
        <DecksTable bind:decks={allDecks.decks} displayOwner={true} />
    {/if}
    <Pagination bind:paginatedObject={myDecks} baseUrl={`/api/auth/reserved/decks/me?languageCode=${localStorage.getItem('languageCode')}`} />
{/if}
