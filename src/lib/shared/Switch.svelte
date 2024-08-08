<script>
    export let value;

    export let size = 2;
    export let disabled = false;

    const handleToggleChange = (event) => {
        value = event.target.checked;
    };
</script>

<label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" on:change="{handleToggleChange}" class="sr-only peer" checked={value} {disabled}>
    <span
            class="relative bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white dark:border-gray-600 toggle-circle"
            style="width: {size * 8}px; height: {size * 4}px;">
        <span
                class="absolute top-0 left-0 bg-white border border-gray-300 rounded-full dark:border-gray-600 toggle-circle"
                style="width: {size * 4}px; height: {size * 4}px; transform: translateX({value ? size * 4 : 0}px); transition: transform 0.3s ease;">
        </span>
    </span>
</label>
