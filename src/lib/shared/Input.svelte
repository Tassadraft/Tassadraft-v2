<script>
    export let type = 'text';
    export let value = '';
    export let placeholder = '';
    export let name = '';
    export let required = false;
    export let disabled = false;
    export let label = '';

    let focused = false;

    const typeWorkaround = node => node.type = type;
</script>

<div class="relative w-full">
    <label for={name} class="absolute text-gray-500 z-10 {focused ? 'text-black bottom-5' : 'top-2 left-20'}">{label}</label>
    <input
            on:focus={() => focused = true}
            on:blur={() => focused = false}
            use:typeWorkaround
            bind:value
            placeholder={focused ? placeholder : ''}
            name={name}
            required={required}
            disabled={disabled}
            class="block w-full px-3 py-2 mt-1 text-base text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
</div>
