<script>
    export let search = '';
    export let placeholder = 'Search...';
    export let debounce = 300;
    export let minChars = 3;
    export let name = '';
    export let disabled = false;
    export let label = '';
    export let handleSearch = () => null;
    export let selected = false;
    export let results = [];
    export let selectedObserver = false;

    let searchTimeout = null;
    let focused = false;

    $: if (selectedObserver && selected) {
        name.focus();
    }

    const searchFunction = async () => {
        if (search.length < minChars) {
            results = [];
            return;
        }
        handleSearch(search);
    };

    const searchDebounced = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchFunction, debounce);
    };
</script>

<div class="relative w-full mt-8 mb-5">
    <label
        for={name}
        class="absolute pointer-events-none z-10 transition-all duration-800 ease-in-out {focused || search.length
            ? 'text-primary-500 bottom-11 left-1'
            : 'text-gray-500 bottom-2.5 left-3'}">{label}</label
    >
    <input
        on:focus={() => (focused = true)}
        on:blur={() => (focused = false)}
        on:keyup={searchDebounced}
        type="search"
        bind:value={search}
        bind:this={name}
        placeholder={focused || search.length ? placeholder : ''}
        {name}
        {disabled}
        class="block w-full px-3 py-2 mt-1 text-base text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
</div>

<style>
    label {
        transition:
            bottom 0.8s ease,
            left 0.8s ease,
            color 0.8s ease;
    }
</style>
