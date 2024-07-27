<script>
    export let type = '';
    export let disabled = false;
    export let idName = '';
    export let className = '';
    export let handleClick = () => {};
</script>

<button
        disabled={disabled}
        id={idName}
        type={type}
        on:click={handleClick}
        class="rounded text-gray-800 dark:text-primary-500 {disabled ? '' : 'hover:text-gray-700 hover:dark:text-primary-400'} transition-colors duration-300 {className}"
>
    <slot />
</button>
