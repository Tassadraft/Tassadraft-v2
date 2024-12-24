<script>
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import FOG from 'vanta/dist/vanta.fog.min';

    let vantaEffect;
    let vantaRef;

    onMount(async () => {
        vantaEffect = FOG({
            el: vantaRef,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x286e,
            midtoneColor: 0x7f7f9d,
            lowlightColor: 0x213131,
            baseColor: 0x0,
            blurFactor: 0.56,
            zoom: 2.2,
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    });

    onDestroy(() => {
        if (vantaEffect) vantaEffect.destroy();
    });
</script>

<div bind:this={vantaRef} class="absolute top-0 left-0 w-full h-full overflow-hidden">
    <slot></slot>
</div>
