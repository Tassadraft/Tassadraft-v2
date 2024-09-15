<script>
    import Icon from './Icon.svelte';

    export let disabled = false;
    export let icon = '';
    export let size = 24;
</script>

<button class={disabled ? 'dark:text-primary-200' : 'text-primary-500 hover:text-primary-200 transition-colors duration-300'} on:click disabled={disabled}>
    <Icon bind:name={icon} {size} />
</button>
