<script>
    import Button from './Button.svelte';
    import Modal from './Modal.svelte';
    import Subtitle from './Subtitle.svelte';

    export let photos = [];
    export let cards = [];
    let selectedPhotoUri = '';
    let showModal = false;

    const handleClick = (e) => {
        selectedPhotoUri = e.target.src;
        showModal = true;
    };

    const handleDelete = () => {
        const photo = photos.find(photo => photo.uri === selectedPhotoUri);
        photo.cards.forEach(card => {
            if (photos.filter(photo => photo.cards.includes(card)).length === 1) {
                cards = cards.filter(c => c !== card);
            }
        });
    };
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {#each photos as photo}
        <Button on:click={handleClick}>
            <img src={photo.uri} alt={photo.uri} class="max-w-1/2 rounded m-auto" />
        </Button>
    {/each}

    <Modal bind:showModal successText="Yes" closeText="No" on:success={handleDelete}>
        <Subtitle>Are you sure you want to delete this photo ?</Subtitle>
    </Modal>
</div>
