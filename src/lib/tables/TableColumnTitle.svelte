<script>
    import {createEventDispatcher} from 'svelte';
    import Icon from '../shared/Icon.svelte';
    import Button from '../shared/Button.svelte';

    const dispatch = createEventDispatcher();

    export let last = false;
    export let first = false;
    export let column = '';
    export let sortBy = '';
    export let sortDirection = 'asc';

    let isSorted = false;
    let sortIcon = '';

    $: {
        isSorted = sortBy === column.name;
        sortIcon = isSorted ? (sortDirection === 'asc' ? 'arrowUp' : 'arrowDown') : '';
    }
</script>

<th class="{first ? 'tr-first text-left' : 'text-center'} {last ? '' : 'border-r border-primary-700'}">
    <Button customStyle={true} on:click={() => dispatch('sort', { column })} disabled={!column.key}>
        <p class="text-sm truncate flex items-center">
            {column.name}
            {#if column.icon}
                <div class="ml-0.5 mt-0.5">
                    <Icon bind:name={column.icon} size="14"/>
                </div>
            {/if}
            {#if isSorted}
                <Icon bind:name={sortIcon}/>
            {/if}
        </p>
    </Button>
</th>
