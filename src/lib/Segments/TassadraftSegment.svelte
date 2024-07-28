<script>
    import Segment from "./Segment.svelte";
    import Modal from '../shared/Modal.svelte';
    import Subtitle from '../shared/Subtitle.svelte';

    export let photos = [];

    let showModal = false;
    let selectedOption = 'Photos';
    let options = [];

    $: {
        options = [
            {name: 'Photos', disabled: selectedOption === 'Photos'},
            {name: 'Cards', disabled: selectedOption === 'Cards' || photos.length === 0, disabledMessage: photos.length ? '' : 'No photos available'},
        ];
    }

    const handleSegmentChange = (event) => {
        selectedOption = event.detail.value;
        if (selectedOption === 'Cards' && photos.filter(photo => !photo.processed).length !== 0) {
            showModal = true;
        }
    };
</script>

<Segment {options} on:change={handleSegmentChange}/>

<Modal bind:showModal successText="Yes" closeText="No" on:success={() => console.log('test')}>
    <Subtitle slot="header">Photos processing</Subtitle>
    <p>Some photos seem not to be processed yet.</p>
    <p>Do you want to process them ?</p>
</Modal>
