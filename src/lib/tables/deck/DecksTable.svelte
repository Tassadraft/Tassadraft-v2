<script>
    import TableHeader from '../TableHeader.svelte';
    import DeckRow from './DeckRow.svelte';
    import { createEventDispatcher } from 'svelte';
    import Subtitle from '../../shared/Subtitle.svelte';
    import Modal from '../../shared/Modal.svelte';
    import axios from '../../../axiosConfig.js';
    import Loader from '../../shared/Loader.svelte';
    import { t } from 'svelte-i18n';
    import { deleteDeck } from '../../../stores/deckStore.js';

    export let decks = [];
    export let displayOwner = false;

    const dispatch = createEventDispatcher();

    let columns = [];
    let sortBy = '';
    let sortDirection = 'asc';
    let selectedDeck = {};
    let showModal = false;
    let loading = false;

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
                deleteDeck(selectedDeck);
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

    $: {
        columns = [
            { name: $t('common.name'), key: 'name' },
            { name: $t('table.deck.format'), key: 'format' },
            { name: $t('table.deck.cards') },
            { name: $t('common.enabled') },
            { name: $t('common.public') },
        ];
        if (displayOwner) {
            columns.push({ name: $t('table.deck.owner'), key: 'owner' });
        } else {
            columns.push({ name: $t('common.actions') });
        }
    }
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

<Modal bind:showModal successText={$t('common.yes')} closeText={$t('common.no')} on:success={handleDelete}>
    <Subtitle>{`${$t('tassadecks.delete-deck')}`} {selectedDeck.name} ?</Subtitle>
</Modal>
