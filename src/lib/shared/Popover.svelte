<script>
    export let show = false;
    export let target = null;

    let x = 0;
    let y = 0;

    $: {
        if (target && show) {
            const { left, top, width, height } = target.getBoundingClientRect();
            x = left + width / 2;
            y = top + height + 10; // Adjust for popover distance below the target
        }
    }
</script>

{#if show}
    <div
        class="absolute text-center text-primary-500 bg-white border border-gray-300 p-2 rounded-md shadow-md w-4/12 z-50"
        style="position: fixed; left: {x}px; top: {y}px; transform: translate(-50%, 0);"
    >
        <slot />
    </div>
{/if}
