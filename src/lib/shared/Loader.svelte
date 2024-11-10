<script>
    export let loading = false;
</script>

{#if loading}
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style="z-index: 9999">
        <div class="rounded-full w-12 h-12 border-4 border-transparent border-t-primary-500 border-l-opacity-20 animate-spin"></div>
    </div>
{/if}

<style>
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
