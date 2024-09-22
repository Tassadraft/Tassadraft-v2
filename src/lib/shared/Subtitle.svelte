<script>
  export let style = '';
  export let className =
    'text-xl font-bold text-black dark:text-white relative';
</script>

<h2 {style} class={className}><slot /></h2>
