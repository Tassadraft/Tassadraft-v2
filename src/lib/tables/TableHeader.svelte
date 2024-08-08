<script>
    import TableColumnTitle from './TableColumnTitle.svelte';
    import { createEventDispatcher } from 'svelte';

    export let columns = [];
    export let sortBy = '';
    export let sortDirection = 'asc';

    const dispatch = createEventDispatcher();
</script>

<thead>
<tr class="h-10 border-b border-primary-700">
    {#each columns as column, index (column)}
        <TableColumnTitle
                first={index === 0}
                last={index === columns.length - 1}
                column={column}
                bind:sortBy
                bind:sortDirection
                on:sort={(e) => dispatch('sort', e.detail.column)}
        />
    {/each}
</tr>
</thead>
