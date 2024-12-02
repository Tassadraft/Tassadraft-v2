<script>
    import Popover from './Popover.svelte';
    import Icon from './Icon.svelte';

    let show = false;
    let iconElement;
</script>

<div class="flex items-center justify-center">
    <div
        role="button"
        tabindex="0"
        class="flex items-center justify-center bg-blue-500 text-white rounded-full size-8 cursor-pointer"
        bind:this={iconElement}
        on:mouseover={() => (show = true)}
        on:focus={() => (show = true)}
        on:mouseleave={() => (show = false)}
        on:blur={() => (show = false)}
    >
        <Icon name="help" />
    </div>

    <Popover {show} target={iconElement}>
        <slot />
    </Popover>
</div>
