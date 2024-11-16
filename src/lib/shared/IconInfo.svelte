<script>
    import Popover from './Popover.svelte';

    let show = false;
    let iconElement;
</script>

<div class="relative inline-block">
    <div
        role="button"
        tabindex="0"
        class="flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 cursor-pointer"
        bind:this={iconElement}
        on:mouseover={() => (show = true)}
        on:focus={() => (show = true)}
        on:mouseleave={() => (show = false)}
        on:blur={() => (show = false)}
    >
        i
    </div>

    <Popover {show} target={iconElement}>
        <slot />
    </Popover>
</div>
