<script>
    export let type = 'button';
    export let disabled = false;
    export let idName = '';
    export let className = '';
    export let additionalStyle = '';
    export let customStyle = false;
    export let ariaLabel = 'This is a button';
</script>

<button
        disabled={disabled}
        id={idName}
        type={type}
        aria-label={ariaLabel}
        on:click
        on:mouseover
        on:focus
        on:blur
        on:mouseout
        class="{customStyle ? className : `cursor-pointer rounded text-gray-800 dark:text-primary-500 ${disabled ? '' : 'hover:text-gray-700 hover:dark:text-primary-400'} transition-colors duration-300`} {additionalStyle}"
>
    <slot/>
</button>
