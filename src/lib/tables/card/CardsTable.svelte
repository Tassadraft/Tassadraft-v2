<script>
    import CardRow from './CardRow.svelte';
    import Modal from '../../shared/Modal.svelte';
    import { showToast } from '../../../service/toastService.js';

    export let cards = [];

    let currency;
    let showModal = false;
    let deletingCard;

    $: currency = localStorage.getItem('currency');

    const handleDelete = (e) => {
        deletingCard = e.detail;
        showModal = true;
    }

    const handleDeleteSuccess = () => {
        cards = cards.filter(card => card.id !== deletingCard.id);
        showModal = false;
        showToast(`${deletingCard.name} deleted`, 'success');
    }
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <thead>
            <tr class="h-10 border-b border-primary-700">
                <th class="tr-first text-left border-r border-primary-700">
                    <p class="text-sm truncate">Name</p>
                </th>
                <th class="text-center border-r border-primary-700">
                    <p class="text-sm truncate">Foil</p>
                </th>
                <th class="text-center border-r border-primary-700">
                    <p class="text-sm truncate">Price</p>
                </th>
                <th class="text-center">
                    <p class="text-sm truncate">Delete</p>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each cards as card}
                <CardRow bind:card={card} bind:currency={currency} on:delete={handleDelete} />
            {/each}
        </tbody>
    </table>
</div>

<Modal bind:showModal={showModal} closeText="No" successText="Yes" on:success={handleDeleteSuccess}>
    <p class="text-black dark:text-white">Delete {deletingCard?.name} ?</p>
</Modal>
