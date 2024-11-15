<script>
    import TableHeader from '../TableHeader.svelte';
    import DeckRow from './DeckRow.svelte';
    import { onMount } from 'svelte';
    import Subtitle from "../../shared/Subtitle.svelte";
    import Modal from "../../shared/Modal.svelte";
    import axios from '../../../axiosConfig.js';

    export let decks = [];
    export let displayOwner = false;

    let columns = [{ name: 'Name', key: 'name' }, { name: 'Cards' }, { name: 'Enabled' }, { name: 'Public' }, { name: 'Actions' }];
    let sortBy = '';
    let sortDirection = 'asc';
    let selectedDeck = {};
    let showModal = false;

    onMount(() => {
        if (displayOwner) {
            columns.push({ name: 'Owner', key: 'owner' });
        }
    });

    const handleSort = (e) => {
        if (sortBy === e.detail.name) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy = e.detail.name;
            sortDirection = 'asc';
        }
        if (sortBy === e.detail.name) {
            decks = [...decks].sort((a, b) => {
                if (a[e.detail.key] < b[e.detail.key]) return sortDirection === 'asc' ? -1 : 1;
                if (a[e.detail.key] > b[e.detail.key]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }
    };

    const handleDeleteDeck = (deck) => {
        selectedDeck = deck;
        showModal = true;
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/auth/reserved/decks/${selectedDeck.id}`);
            if (response.status === 200) {
                decks = decks.filter((deck) => deck.id !== selectedDeck.id);
            }
        } catch (e) {
            console.error(e);
        } finally {
            showModal = false;
        }
    };
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <TableHeader bind:columns bind:sortBy bind:sortDirection on:sort={handleSort} />
        <tbody>
            {#each decks as deck}
                <DeckRow bind:deck {displayOwner} on:delete={() => handleDeleteDeck(deck)} />
            {/each}
        </tbody>
    </table>
</div>

<Modal bind:showModal successText="Yes" closeText="No" on:success={handleDelete}>
    <Subtitle>Are you sure you want to delete {selectedDeck.name} ?</Subtitle>
</Modal>
