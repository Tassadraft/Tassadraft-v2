<script>
  export let href = '';
  export let className = '';
</script>

<a {href} class={className} on:click>
  <slot />
</a>
