<script>
    import CardRow from './CardRow.svelte';
    import Modal from '../../shared/Modal.svelte';
    import { showToast } from '../../../service/toastService.js';
    import Fab from '../../shared/Fab.svelte';
    import TableHeader from '../TableHeader.svelte';

    export let cards = [];
    export let deletedCards = [];

    let showModal = false;
    let currency = localStorage.getItem('currency');
    let deletingCard;
    const columns = [
        {name: 'Name', key: 'name'},
        {name: 'Foil'},
        {name: 'Price', key: 'displayedPrice', icon: currency},
        {name: 'Delete'}
    ];
    let sortBy = '';
    let sortDirection = 'asc';

    const handleDelete = (e) => {
        deletingCard = e.detail;
        showModal = true;
    }

    const handleDeleteSuccess = () => {
        cards = cards.filter(card => card.scryfallId !== deletingCard.scryfallId);
        deletedCards = [...deletedCards, deletingCard];
        showModal = false;
        showToast(`${deletingCard.translation.name} deleted`, 'success');
    }

    const handleUndo = () => {
        const lastDeletedCard = deletedCards.pop();
        cards = [...cards, lastDeletedCard];
    }

    const handleSort = (e) => {
        if (sortBy === e.detail.name) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy = e.detail.name;
            sortDirection = 'asc';
        }
        if (sortBy === e.detail.name) {
            cards = [...cards].sort((a, b) => {
                if (a[e.detail.key] < b[e.detail.key]) return sortDirection === 'asc' ? -1 : 1;
                if (a[e.detail.key] > b[e.detail.key]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }
    }
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <TableHeader {columns} bind:sortBy bind:sortDirection on:sort={handleSort} />
        <tbody>
        {#each cards as card}
            <CardRow bind:card={card} bind:currency={currency} on:delete={handleDelete} />
        {/each}
        </tbody>
    </table>
</div>

<Modal bind:showModal={showModal} closeText="No" successText="Yes" on:success={handleDeleteSuccess}>
    <p class="text-black dark:text-white">Delete {deletingCard?.translation.name} ?</p>
</Modal>

{#if deletedCards.length > 0}
    <Fab icon="undo" horizontal="left" vertical="bottom" on:click={handleUndo} />
{/if}
