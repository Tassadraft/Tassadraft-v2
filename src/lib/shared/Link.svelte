<script>
  export let href = '';
  export let className = '';
  export let target = '';
</script>

<a {href} class={className} {target} on:click>
  <slot />
</a>
