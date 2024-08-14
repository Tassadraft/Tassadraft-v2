<script>
    export let type = 'button';
    export let disabled = false;
    export let idName = '';
    export let className = '';
    export let additionalStyle = '';
    export let customStyle = false;
    export let ariaLabel = 'This is a button';
    export let iconButton = false;

    $: buttonClasses = customStyle
        ? className
        : `${iconButton
            ? `text-gray-700 dark:text-primary-100 hover:text-gray-800 hover:dark:text-primary-500`
            : 'text-gray-800 dark:text-primary-500 hover:text-gray-700 hover:dark:text-primary-400'}
            ${disabled ? '' : ' cursor-pointer'} rounded transition-colors duration-300 ${additionalStyle}`;
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
        class={buttonClasses}
>
    <slot/>
</button>
