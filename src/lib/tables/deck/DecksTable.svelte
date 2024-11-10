<script>
    import TableHeader from '../TableHeader.svelte';
    import DeckRow from './DeckRow.svelte';
    import { onMount } from 'svelte';

    export let decks = [];
    export let displayOwner = false;

    let columns = [{ name: 'Name', key: 'name' }, { name: 'Cards' }, { name: 'Enabled' }, { name: 'Public' }];
    let sortBy = '';
    let sortDirection = 'asc';

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
</script>

<div class="overflow-hidden rounded-lg border border-primary-700 mt-5">
    <table class="w-full">
        <TableHeader bind:columns bind:sortBy bind:sortDirection on:sort={handleSort} />
        <tbody>
            {#each decks as deck}
                <DeckRow bind:deck {displayOwner} />
            {/each}
        </tbody>
    </table>
</div>
