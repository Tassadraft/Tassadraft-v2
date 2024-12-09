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
        <p>{title}</p>
    </div>
{/if}

<div class="flex flex-row items-center gap-0.5">
    <span class={checked ? 'dark:text-white' : 'text-primary-500'}>
        <Icon name="sun" size={iconSize} />
    </span>
    <Switch size={switchSize} bind:value={checked} />
    <span class={checked ? 'text-primary-500' : 'dark:text-white'}>
        <Icon name="moon" size={iconSize} />
    </span>
</div>
