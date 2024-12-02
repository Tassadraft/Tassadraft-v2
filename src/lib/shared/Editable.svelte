<script>
    import IconButton from './IconButton.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let className = '';
    export let iconClassName = '';
    export let value = '';
    export let min = 3;
    export let max = 100;
    export let editable = true;

    let editing = false;
    let icon = 'pen';
    let inputElement;
    let message = '';
    let initialValue = value;

    const checkValue = () => {
        if (value.length < min || value.length > max) {
            message = `The value must be between ${min} and ${max} characters`;
            return false;
        } else {
            message = '';
            return true;
        }
    };

    const handleKeyDown = (event) => {
        if ((event.key === 'Enter' || event.key === 'Escape' || event.key === 'Tab') && checkValue()) {
            editing = false;
            dispatch('rename');
        }
    };

    const handleBlur = () => {
        if (checkValue()) {
            dispatch('rename');
        } else {
            value = initialValue;
        }
        editing = false;
    };

    const handleIconClick = () => {
        if (editable) {
            editing = !editing;
            if (editing) {
                initialValue = value;
            }
        }
    };

    $: icon = editing ? 'check' : 'pen';
    $: if (editing && inputElement) {
        inputElement.focus();
    }
</script>

<div class="flex flex-row gap-3">
    {#if editing}
        <input
            bind:this={inputElement}
            class={`${className} bg-transparent`}
            type="text"
            bind:value
            on:keydown={handleKeyDown}
            on:blur={handleBlur}
        />
    {:else}
        <slot />
    {/if}

    {#if editable}
        <div class={iconClassName}>
            <IconButton bind:icon on:click={handleIconClick} />
        </div>
    {/if}
</div>
<p class="text-primary-500 text-xs">{message}</p>
