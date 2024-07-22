<script>
    export let size = 24;
    export let color = '';
</script>

<svg class={`${color || 'text-gray-800 dark:text-white'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 16 4-4-4-4"/>
</svg>
