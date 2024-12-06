<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value = false;
    export let size = 2;
    export let disabled = false;
    export let label = '';
    export let name = '';
    export let required = false;

    const handleToggleChange = (event) => {
        value = event.target.checked;
        dispatch('change', value);
    };
</script>

{#if name}
    <input
        type="checkbox"
        {name}
        bind:checked={value}
        {required}
        class="sr-only peer"
        style="position: absolute; opacity: 0; pointer-events: none;"
    />
{/if}
<div class="flex flex-row gap-3">
    <label class="inline-flex items-center {disabled ? '' : 'cursor-pointer'}">
        <input type="checkbox" on:change={handleToggleChange} class="sr-only peer" bind:checked={value} {disabled} aria-required={required} />
        <span
            class="relative bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:bg-primary-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white dark:border-gray-600 toggle-circle"
            style="width: {size * 8}px; height: {size * 4}px;"
        >
            <span
                class="absolute top-0 left-0 bg-white border border-gray-300 rounded-full dark:border-gray-600 toggle-circle"
                style="width: {size * 4}px; height: {size * 4}px; transform: translateX({value ? size * 4 : 0}px); transition: transform 0.3s ease;"
            >
            </span>
        </span>
    </label>
    {#if label}
        <p class={value ? 'duration-300 transition-colors text-primary-500' : ''}>
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </p>
    {/if}
</div>
