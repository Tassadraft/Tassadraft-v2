<script>
    import {onMount} from 'svelte';
    import Menu from '../menu/Menu.svelte';

    onMount(() => {
        document.title = 'Account';
    });
</script>

<div class="flex justify-start">
    <div class="mt-3">
        <Menu />
    </div>
</div>
