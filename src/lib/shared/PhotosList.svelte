<script>
    import Button from './Button.svelte';
    import Modal from './Modal.svelte';
    import Subtitle from './Subtitle.svelte';
    import Fab from './Fab.svelte';
    import { showToast } from '../../service/toastService.js';
    import { t } from 'svelte-i18n';

    export let photos = [];
    export let cards = [];
    export let deletedPhotos = [];

    let selectedPhotoUri = '';
    let showModal = false;

    const handleClick = (e) => {
        selectedPhotoUri = e.target.src;
        showModal = true;
    };

    const handleDelete = () => {
        const photo = photos.find((photo) => photo.uri === selectedPhotoUri);
        photo.cards.forEach((card) => {
            if (photos.filter((photo) => photo.cards.includes(card)).length === 1) {
                cards = cards.filter((c) => c !== card);
            }
        });
        deletedPhotos = [...deletedPhotos, photo];
        photos = photos.filter((photo) => photo.uri !== selectedPhotoUri);
        showToast($t('toast.photo.deleted'), 'success');
    };

    const handleUndo = () => {
        const photo = deletedPhotos[deletedPhotos.length - 1];
        deletedPhotos = deletedPhotos.slice(0, -1);
        photos = [...photos, photo];

        photo.cards.forEach((card) => {
            const cardExists = cards.some((existingCard) => existingCard.scryfallId === card.scryfallId);
            if (!cardExists) {
                cards = [...cards, card];
            }
        });
        showToast($t('toast.photo.restored'), 'success');
    };
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {#each photos as photo}
        <Button on:click={handleClick}>
            <img src={photo.uri} alt={photo.uri} class="max-w-1/2 rounded m-auto" />
        </Button>
    {/each}

    <Modal bind:showModal successText={$t('common.yes')} closeText={$t('common.no')} on:success={handleDelete}>
        <Subtitle>Are you sure you want to delete this photo ?</Subtitle>
    </Modal>
</div>

{#if deletedPhotos.length > 0}
    <Fab icon="undo" horizontal="left" vertical="bottom" on:click={handleUndo} />
{/if}
