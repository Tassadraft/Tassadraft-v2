<script>
    export let show = false;
    export let target = null;

    let x = 0;
    let y = 0;
    let popover;
    let popoverHeight = 0;

    $: if (popover) {
        popoverHeight = popover.offsetHeight || 0;
    }

    $: {
        if (target && show) {
            const { left, top, width, height } = target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const bottomY = top + height + 10;
            const isOffscreen = bottomY + popoverHeight > viewportHeight;

            x = left + width / 2;
            y = isOffscreen ? top - popoverHeight - 10 : bottomY;
        }
    }
</script>

{#if show}
    <div
        bind:this={popover}
        class="absolute text-center text-primary-500 bg-white border border-gray-300 p-2 rounded-md shadow-md z-50"
        style="position: fixed; left: {x}px; top: {y}px; transform: translate(-50%, 0);"
    >
        <slot />
    </div>
{/if}
