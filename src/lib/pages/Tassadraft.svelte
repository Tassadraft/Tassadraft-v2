<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Photo from '../shared/Photo.svelte';
    import TassadraftSegment from '../Segments/TassadraftSegment.svelte';
    import Title from '../shared/Title.svelte';

    let photos = [];

    onMount(() => {
        document.title = 'Tassadraft';
    });
</script>

<Menu />
<Title>Tassadraft</Title>
<TassadraftSegment bind:photos={photos} />
<Photo on:photo={(e) => photos = [...photos, {uri: e.detail.photo.webpath, cards: [], processed: false}]} />
