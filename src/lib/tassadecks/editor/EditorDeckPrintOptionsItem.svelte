<script>
    import IconButton from '../../shared/IconButton.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let item;
</script>

<div class="flex flex-row gap-1">
    <IconButton icon="minus" disabled={item.quantity === 0} on:click={() => dispatch('decrement', item)} />
    <p class="dark:text-white">{item.quantity}</p>
    <IconButton icon="plus" on:click={() => dispatch('increment', item)} />
    <p class="ml-3 dark:text-white">{item.related.print.translation.name}</p>
</div>
