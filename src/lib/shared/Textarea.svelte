<script>
    export let value = '';
    export let placeholder;
    export let name;
    export let required = false;
    export let disabled = false;
    export let label;
    export let min = null;
    export let max = null;

    let focused = false;

    const classes = `block w-full px-3 py-2 mt-1 text-base text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
        disabled ? 'bg-gray-300 dark:bg-gray-500' : ''
    }`;

    const inputAttributes = {
        ...(min !== null && { minlength: min }),
        ...(max !== null && { maxlength: max }),
    };
</script>

<div class="relative w-full mt-10 mb-5">
    <label
        for={name}
        class="absolute pointer-events-none z-10 transition-all duration-800 ease-in-out {focused || value
            ? `text-primary-500 ${inputAttributes.minlength || inputAttributes.maxlength ? 'bottom-21' : 'bottom-16'} left-1`
            : 'text-gray-500 bottom-11 left-3'}"
    >
        {label}
        {#if required}
            <span class="text-red-500">*</span>
        {/if}
    </label>

    <textarea
        on:focus={() => (focused = true)}
        on:blur={() => (focused = false)}
        bind:value
        placeholder={focused || value ? placeholder : ''}
        {name}
        {required}
        {disabled}
        class={classes}
        {...inputAttributes}
    ></textarea>
    {#if inputAttributes.minlength && value.length < inputAttributes.minlength}
        <p class="text-right">
            <span class="text-red-500">
                {value.length}/{inputAttributes.minlength}
            </span>
        </p>
    {:else if inputAttributes.maxlength}
        <p class="text-right">
            <span class={value.length > inputAttributes.maxlength ? 'text-red-500' : ''}>
                {value.length}/{inputAttributes.maxlength}
            </span>
        </p>
    {/if}
</div>

<style>
    label {
        transition:
            bottom 0.8s ease,
            left 0.8s ease,
            color 0.8s ease;
    }
</style>
