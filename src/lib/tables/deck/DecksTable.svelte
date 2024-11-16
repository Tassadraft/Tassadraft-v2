<script>
    import TableHeader from '../TableHeader.svelte';
    import DeckRow from './DeckRow.svelte';
    import { createEventDispatcher, onMount } from 'svelte';
    import Subtitle from '../../shared/Subtitle.svelte';
    import Modal from '../../shared/Modal.svelte';
    import axios from '../../../axiosConfig.js';
    import Loader from '../../shared/Loader.svelte';

    export let decks = [];
    export let displayOwner = false;

    const dispatch = createEventDispatcher();

    let columns = [{ name: 'Name', key: 'name' }, { name: 'Cards' }, { name: 'Enabled' }, { name: 'Public' }];
    let sortBy = '';
    let sortDirection = 'asc';
    let selectedDeck = {};
    let showModal = false;
    let loading = false;

    onMount(() => {
        if (displayOwner) {
            columns.push({ name: 'Owner', key: 'owner' });
        } else {
            columns.push({ name: 'Actions' });
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

    const handleTrashClicked = (deck) => {
        selectedDeck = deck;
        showModal = true;
    };

    const handleDelete = async () => {
        try {
            loading = true;
            const response = await axios.delete(`/api/auth/reserved/decks/${selectedDeck.id}`);
            if (response.status === 200) {
                dispatch('deckDeleted');
                decks = decks.filter((deck) => deck.id !== selectedDeck.id);
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
            showModal = false;
        }
    };
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <TableHeader bind:columns bind:sortBy bind:sortDirection on:sort={handleSort} />
        <tbody>
            {#each decks as deck}
                <DeckRow bind:deck {displayOwner} on:delete={() => handleTrashClicked(deck)} />
            {/each}
        </tbody>
    </table>
</div>

<Loader bind:loading />

<Modal bind:showModal successText="Yes" closeText="No" on:success={handleDelete}>
    <Subtitle>Are you sure you want to delete {selectedDeck.name} ?</Subtitle>
</Modal>
