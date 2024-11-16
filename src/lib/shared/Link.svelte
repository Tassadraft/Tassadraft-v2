<script>
    export let href = '';
    export let className = '';
    export let target = '';
    export let ariaLabel = '';
    export let style = '';
</script>

<a
    {href}
    aria-label={ariaLabel}
    {target}
    class={className}
    {style}
    on:click
>
    <slot />
</a>
