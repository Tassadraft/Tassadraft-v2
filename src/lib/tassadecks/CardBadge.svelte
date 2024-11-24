<script>
    import { onMount } from 'svelte';

    export let type = 'success';

    let bgClass = 'bg-green-500';

    onMount(() => {
        switch (type) {
            case 'warning':
                bgClass = 'bg-yellow-500';
                break;
            case 'error':
                bgClass = 'bg-red-500';
                break;
            default:
                bgClass = 'bg-green-500';
                break;
        }
    });
</script>

<div
    class={`absolute z-50 bottom-0 right-0 w-24 h-24 ${bgClass} p-0.5 bg-opacity-70 clip-triangle rounded-br-lg`}
>
    <p class="w-32 text-center text-black font-bold text-xl absolute bottom-8 right-8 -rotate-45 transform translate-x-1/2 translate-y-1/2">
        <slot/>
    </p>
</div>

<style>
    .clip-triangle {
        clip-path: polygon(100% 100%, 0 100%, 100% 0);
    }
</style>
