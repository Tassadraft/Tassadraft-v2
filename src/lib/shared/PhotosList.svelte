<script>
    import Button from './Button.svelte';
    import Modal from './Modal.svelte';
    import Subtitle from './Subtitle.svelte';

    export let photos = [];
    let selectedPhotoUri = '';
    let showModal = false;

    const handleClick = (e) => {
        selectedPhotoUri = e.target.src;
        showModal = true;
    };

    const handleDelete = () => {
        photos = photos.filter(photo => photo.uri !== selectedPhotoUri);
    };
</script>

<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {#each photos as photo}
        <Button on:click={handleClick}>
            <img src={photo.uri} alt={photo.uri} class="max-w-1/2 rounded" />
        </Button>
    {/each}

    <Modal bind:showModal successText="Yes" closeText="No" on:success={handleDelete}>
        <Subtitle>Are you sure you want to delete this photo ?</Subtitle>
    </Modal>
</div>
