<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Photo from '../shared/Photo.svelte';

    const photos = [];

    onMount(() => {
        document.title = 'Tassadraft';
    });
</script>

<Menu />
<Photo on:photo={(e) => photos.push({uri: e.detail.photo.webpath, cards: []})} />
