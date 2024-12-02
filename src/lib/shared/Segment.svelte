<script>
    import { createEventDispatcher } from 'svelte';
    import Button from './Button.svelte';
    import Popover from './Popover.svelte';

    const dispatch = createEventDispatcher();

    export let options = [];
    export let selected;

    let popoverMessage = '';
    let showPopover = false;
    let popoverTarget;

    const handleSelect = (option) => {
        if (!option.disabled) {
            dispatch('change', { value: option.value });
        }
    };

    const handleMouseOver = (option, event) => {
        if (option.disabled && option.disabledMessage) {
            popoverTarget = event.target;
            popoverMessage = option.disabledMessage;
            showPopover = true;
        }
    };

    const handleMouseOut = () => {
        showPopover = false;
    };
</script>

<div class="flex border bg-primary-400 border-gray-400 dark:border-gray-400 rounded-2xl relative">
    {#each options as option}
        <Button
            disabled={option.disabled}
            customStyle={true}
            additionalStyle="flex-1 py-2 text-center transition-colors duration-300 rounded-2xl {option.value === selected
                ? 'bg-primary-800 text-white'
                : 'text-black hover:text-primary-800'}"
            on:click={() => handleSelect(option)}
            on:mouseover={(event) => handleMouseOver(option, event)}
            on:mouseout={handleMouseOut}
        >
            {option.name}
        </Button>
    {/each}
    <Popover target={popoverTarget} show={showPopover}>
        {popoverMessage}
    </Popover>
</div>
