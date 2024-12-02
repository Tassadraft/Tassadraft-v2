<script>
    import IconButton from '../../shared/IconButton.svelte';
    import { createEventDispatcher } from 'svelte';
    import Link from '../../shared/Link.svelte';

    const dispatch = createEventDispatcher();

    export let item;

    let containerRef;
</script>

<div class="flex flex-row gap-1" bind:this={containerRef}>
    <IconButton icon="minus" disabled={item.quantity === 0} on:click={() => dispatch('decrement', item)} />
    <p class="dark:text-white">{item.quantity}</p>
    <IconButton icon="plus" on:click={() => dispatch('increment', item)} />
    <Link
        on:mouseenter={() => dispatch('mouseenter', { ref: containerRef, item })}
        on:focus={() => dispatch('mouseenter', { ref: containerRef, item })}
        on:mouseleave={() => dispatch('mouseleave')}
        on:blur={() => dispatch('mouseleave')}
    >
        <p class="ml-3 dark:text-white">{item.related.print.translation.name}</p>
    </Link>
</div>
