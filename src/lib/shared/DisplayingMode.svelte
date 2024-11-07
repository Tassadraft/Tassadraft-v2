<script>
    import IconButton from './IconButton.svelte';

    export let displayingMode = 'list';
</script>

<div class="flex flex-row justify-end">
    <IconButton icon="list" disabled={displayingMode === 'list'} on:click={() => (displayingMode = 'list')} />
    <IconButton icon="grid" disabled={displayingMode === 'grid'} on:click={() => (displayingMode = 'grid')} />
</div>
