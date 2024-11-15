<script>
    import {onMount} from "svelte";

    export let type = 'success';

    let color = 'green';

    onMount(() => {
        switch (type) {
            case 'warning':
                color = 'yellow';
                break;
            case 'error':
                color = 'red';
                break;
            default:
                color = 'green';
                break;
        }
    });
</script>

<div class="absolute z-10 bottom-0 right-0 w-24 h-24 bg-{color}-500 p-0.5 bg-opacity-70 clip-triangle rounded-br-lg">
    <p class="w-32 text-center text-black font-bold text-xl absolute bottom-8 right-8 -rotate-45 transform translate-x-1/2 translate-y-1/2">
        <slot />
    </p>
</div>

<style>
    .clip-triangle {
        clip-path: polygon(100% 100%, 0 100%, 100% 0);
    }
</style>
