<script>
    import Icon from './Icon.svelte';

    export let disabled = false;
    export let icon = '';
    export let size = 24;
    export let idName = '';
    export let additionalClasses = '';
</script>

<button
    id={idName}
    class={`${additionalClasses} ${disabled ? 'dark:text-primary-200' : 'text-primary-500 hover:text-black hover:dark:text-primary-200 transition-colors duration-300'}`}
    on:click
    {disabled}
>
    <Icon bind:name={icon} {size} />
</button>
