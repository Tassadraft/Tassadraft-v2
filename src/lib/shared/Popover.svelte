<script>
  export let show = false;
  export let target = null;

  let x = 0;
  let y = 0;

  $: {
    if (target) {
      const { left, top, width } = target.getBoundingClientRect();
      x = left + width / 2;
      y = top + 25;
    }
  }
</script>

{#if show}
  <div
    class="absolute text-center text-primary-500 bg-white border border-gray-300 p-2 rounded-md shadow-md w-4/12"
    style="left: {x}px; top: {y}px; transform: translate(-50%, -100%);"
  >
    <slot />
  </div>
{/if}
