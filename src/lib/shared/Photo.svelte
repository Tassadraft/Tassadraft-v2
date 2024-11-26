<script>
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
    import Fab from './Fab.svelte';
    import { createEventDispatcher } from 'svelte';
    import IconButton from "./IconButton.svelte";
    import Button from "./Button.svelte";
    import Icon from "./Icon.svelte";

    export let mode = 'fab';

    const dispatch = createEventDispatcher();

    const takePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 90,
            });

            dispatch('photo', { photo });
        } catch (error) {}
    };
</script>

{#if mode === 'fab'}
<Fab icon="camera" horizontal="middle" vertical="bottom" on:click={takePhoto} />
{:else if mode === 'inline'}
    <Button on:click={takePhoto}>
        <div class="flex gap-1 text-nowrap">
            <Icon name="camera" />
            <slot />
        </div>
    </Button>
{/if}
