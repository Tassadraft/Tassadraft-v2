<script>
    export let size = 24;
    export let color = '';
</script>

<svg class={`${color || 'text-gray-800 dark:text-white'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
</svg>
