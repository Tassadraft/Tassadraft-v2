<script>
    import CardRow from './CardRow.svelte';
    import { showToast } from '../../../services/toastService.js';
    import Fab from '../../shared/Fab.svelte';
    import TableHeader from '../TableHeader.svelte';
    import { t } from 'svelte-i18n';
    import ConfirmModal from '../../shared/ConfirmModal.svelte';

    export let cards = [];
    export let deletedCards = [];

    let showModal = false;
    let currency = localStorage.getItem('currency');
    let deletingCard;
    let columns = [];
    let sortBy = '';
    let sortDirection = 'asc';

    const handleDelete = (e) => {
        deletingCard = e.detail;
        showModal = true;
    };

    const handleDeleteSuccess = () => {
        cards = cards.filter((card) => card.scryfallId !== deletingCard.scryfallId);
        deletedCards = [...deletedCards, deletingCard];
        showModal = false;
        showToast(`${deletingCard.translation.name} deleted`);
    };

    const handleUndo = () => {
        const lastDeletedCard = deletedCards.pop();
        cards = [...cards, lastDeletedCard];
    };

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
    };

    $: columns = [
        { name: $t('common.name'), key: 'name' },
        { name: $t('table.card.set') },
        { name: $t('table.card.foil') },
        { name: $t('table.card.price'), key: 'displayedPrice', icon: currency },
        { name: $t('common.delete') },
    ];
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <TableHeader {columns} bind:sortBy bind:sortDirection on:sort={handleSort} />
        <tbody>
            {#each cards as card}
                <CardRow bind:card {currency} on:delete={handleDelete} />
            {/each}
        </tbody>
    </table>
</div>

<ConfirmModal bind:showModal on:success={handleDeleteSuccess}>
    <p>Delete {deletingCard?.translation.name} ?</p>
</ConfirmModal>

{#if deletedCards.length > 0}
    <Fab icon="undo" horizontal="left" vertical="bottom" on:click={handleUndo} />
{/if}
