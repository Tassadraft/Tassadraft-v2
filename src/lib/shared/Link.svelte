<script>
  export let href = '';
  export let className = '';
  export let ariaLabel = '';
</script>

<a {href} aria-label={ariaLabel} class={className} on:click>
  <slot />
</a>
