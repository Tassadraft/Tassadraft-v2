<script>
    import Switch from './Switch.svelte';
    import Icon from './Icon.svelte';

    let checked = localStorage.getItem('theme') === 'dark';

    $: localStorage.setItem('theme', checked ? 'dark' : 'light');
    $: document.body.classList.toggle('dark', checked);
</script>

<div class="flex flex-row items-center gap-0.5">
    <Icon name="sun" size={Number(size)+30} color={checked ? '' : 'primary'} />
    <Switch size={size} bind:value={checked} />
    <Icon name="moon" size={Number(size)+30} color={checked ? 'primary' : ''} />
</div>
