<script>
    import Icon from './Icon.svelte';
    import Button from './Button.svelte';

    export let horizontal = 'right';
    export let vertical = 'bottom';
    export let icon = '';

    const validHorizontal = ['right', 'left', 'middle'];
    const validVertical = ['top', 'bottom', 'center'];

    $: horizontal = validHorizontal.includes(horizontal) ? horizontal : 'right';
    $: vertical = validVertical.includes(vertical) ? vertical : 'bottom';

    const horizontalClasses = {
        right: 'right-4',
        left: 'left-4',
        middle: 'left-1/2 transform -translate-x-1/2',
    };

    const verticalClasses = {
        top: 'top-4',
        bottom: 'bottom-4',
        center: 'top-1/2 transform -translate-y-1/2',
    };
</script>

<Button
    on:click
    customStyle={true}
    style="z-index: 5000"
    className="text-white shadow-lg flex items-center justify-center fixed size-10 rounded-full bg-primary-600 hover:bg-primary-900 transition-colors duration-300 {verticalClasses[
        vertical
    ]} {horizontalClasses[horizontal]}"
>
    <Icon name={icon} />
</Button>
