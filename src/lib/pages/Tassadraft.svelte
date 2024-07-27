<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        document.title = 'Tassadraft';
    });
</script>

<div class="flex justify-start">
    <div class="mt-3">
        <Menu />
    </div>
</div>
