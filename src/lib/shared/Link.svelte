<script>
    export let href = '';
    export let className = '';
    export let onClick;
</script>

<a href={href} class={className} on:click={onClick}>
    <slot />
</a>
