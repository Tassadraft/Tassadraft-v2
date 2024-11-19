<script>
    import TableColumnTitle from './TableColumnTitle.svelte';
    import { createEventDispatcher } from 'svelte';

    export let columns = [];
    export let sortBy = '';
    export let sortDirection = 'asc';
    export let displayActions = false;

    const dispatch = createEventDispatcher();
</script>

<thead>
    <tr class="h-10 border-b border-primary-700">
        {#each columns as column, index (column)}
            {#if !column.action || !displayActions}
                <TableColumnTitle
                    first={index === 0}
                    last={index === columns.length - 1}
                    {column}
                    bind:sortBy
                    bind:sortDirection
                    on:sort={(e) => dispatch('sort', e.detail.column)}
                />
            {/if}
        {/each}
    </tr>
</thead>
