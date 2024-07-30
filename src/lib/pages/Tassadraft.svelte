<script>
    import Menu from '../menu/Menu.svelte';
    import Photo from '../shared/Photo.svelte';
    import TassadraftSegment from '../Segments/TassadraftSegment.svelte';
    import Title from '../shared/Title.svelte';
    import PhotosList from '../shared/PhotosList.svelte';
    import CardsTable from '../tables/card/CardsTable.svelte';

    let photos = [];
    let cards = [];
    let state;

    const handleProcessed = (e) => {
        e.detail?.cards?.forEach((card) => {
            if (cards.find((c) => c.name === card.name) === undefined) {
                cards = [...cards, card];
            }
        });
    }
</script>

<Menu />
<Title title="Tassadraft" />
<TassadraftSegment bind:selectedOption={state} bind:photos={photos} on:processed={handleProcessed} />
{#if state === 'Photos'}
    <PhotosList bind:photos={photos} />
    <Photo on:photo={(e) => photos = [...photos, {uri: e.detail.photo.webPath, cards: [], processed: false}]} />
{:else}
    {#if state === 'Cards'}
        <CardsTable bind:cards={cards} />
    {/if}
{/if}
