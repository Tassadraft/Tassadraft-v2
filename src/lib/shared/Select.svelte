<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let options = [];
    export let selectedOption = null;
    export let name = null;
    export let label = '';
    export let required = false;

    const handleSelect = (e) => {
        selectedOption = options.find((option) => {
            return option.value === Number(e.target.value);
        });
        dispatch('change', { selectedOption });
    };
</script>

<div class="relative w-full mt-8 mb-5">
    {#if label}
        <label for={name} class="block font-medium dark:text-primary-500 absolute bottom-11 left-1 mb-1">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}

    <select
        {name}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        on:change={handleSelect}
    >
        {#each options as option}
            <option class="capitalize" value={option.value} selected={selectedOption?.value === option.value}>
                {option.label}
            </option>
        {/each}
    </select>
</div>
