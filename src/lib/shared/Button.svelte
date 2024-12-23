<script>
    export let type = 'button';
    export let disabled = false;
    export let idName = '';
    export let className = '';
    export let additionalStyle = '';
    export let customStyle = false;
    export let ariaLabel = 'This is a button';
    export let style = '';
</script>

<button
    {disabled}
    id={idName}
    {type}
    aria-label={ariaLabel}
    on:click
    on:mouseover
    on:focus
    on:blur
    on:mouseout
    {style}
    class="{customStyle
        ? className
        : `rounded ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800 dark:text-primary-500 hover:text-gray-700 hover:dark:text-primary-400 cursor-pointer'} transition-colors duration-300`} {additionalStyle}"
>
    <slot />
</button>
