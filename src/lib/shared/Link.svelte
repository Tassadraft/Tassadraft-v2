<script>
    export let href = '';
    export let className = '';
    export let target = '';
    export let ariaLabel = '';
</script>

<a {href} aria-label={ariaLabel} {target} class={className} on:click>
    <slot />
</a>
