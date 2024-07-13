<script>
    import Switch from './Switch.svelte';
    import Icon from './Icon.svelte';

    export let size = 4;

    let checked = localStorage.getItem('theme') === 'dark';

    $: localStorage.setItem('theme', checked ? 'dark' : 'light');
    $: document.body.classList.toggle('dark', checked);
</script>

<div class="flex flex-row items-center gap-0.5">
    <Icon name="sun" size="{size+1}" />
    <Switch size={size} bind:value={checked} />
    <Icon name="moon" size="{size+1}" />
</div>
