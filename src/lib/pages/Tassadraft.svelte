<script>
    import Menu from '../menu/Menu.svelte';
    import Photo from '../shared/Photo.svelte';
    import TassadraftSegment from '../tassadraft/TassadraftSegment.svelte';
    import Title from '../shared/Title.svelte';
    import PhotosList from '../shared/PhotosList.svelte';
    import CardsTable from '../tables/card/CardsTable.svelte';
    import { t } from 'svelte-i18n';

    let photos = [];
    let cards = [];
    let state = 'photos';
    let deletedPhotos = [];
    let deletedCards = [];

    const handleProcessed = (e) => {
        const unprocessedPhotos = photos.filter((photo) => !photo.processed);
        e.detail?.cards?.forEach((cardObject) => {
            let savedCard = cards.find((c) => c.scryfallId === cardObject.print.scryfallId);
            if (!savedCard) {
                savedCard = { ...cardObject.print, photos: [] };
            }
            unprocessedPhotos.forEach((photo, index) => {
                if (cardObject.images.includes(index)) {
                    photo.cards = [...photo.cards, savedCard];
                    savedCard.photos = [...savedCard.photos, photo.uri];
                }
            });
            if (!cards.includes(savedCard)) {
                cards = [...cards, savedCard];
            }
        });

        photos = photos.map((photo) => ({ ...photo, processed: true }));
    };
</script>

<Menu />
<Title title={$t('common.tassadraft')} />
<TassadraftSegment bind:selectedOption={state} bind:photos on:processed={handleProcessed} />

{#if state === 'photos'}
    <PhotosList bind:deletedPhotos bind:cards bind:photos />
    <Photo on:photo={(e) => (photos = [...photos, { uri: e.detail.photo.webPath, cards: [], processed: false }])} />
{:else if state === 'cards'}
    <CardsTable bind:deletedCards bind:cards />
{/if}
