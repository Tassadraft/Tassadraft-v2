<script>
    import Switch from './Switch.svelte';
    import Icon from './Icon.svelte';

    export let title = '';

    let checked = localStorage.getItem('theme') === 'dark';

    const iconSize = 20;
    const switchSize = 4;

    $: localStorage.setItem('theme', checked ? 'dark' : 'light');
    $: document.body.classList.toggle('dark', checked);
</script>

{#if title}
    <div class="legend font-bold mb-2">
        {title}
    </div>
{/if}

<div class="flex flex-row items-center gap-0.5">
    <Icon name="sun" size={iconSize} color={checked ? '' : 'primary'} />
    <Switch size={switchSize} bind:value={checked} />
    <Icon name="moon" size={iconSize} color={checked ? 'primary' : ''} />
</div>
