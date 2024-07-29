<script>
    import Segment from "./Segment.svelte";
    import Modal from '../shared/Modal.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import axios from '../../axiosConfig.js';
    import { createEventDispatcher } from 'svelte';
    import getBase64Strings from '../../service/base64Service.js';

    const dispatch = createEventDispatcher();

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

    const handleSegmentChange = async (event) => {
        if (selectedOption === 'Photos' && photos.filter(photo => !photo.processed).length !== 0) {
            showModal = true;
        } else {
            selectedOption = event.detail;
        }
    };

    const handleSuccess = async () => {
        try {
            const base64Strings = await getBase64Strings(photos.filter(photo => !photo.processed));
            console.log(base64Strings);
            const response = await axios.post('/api/auth/reserved/process', {photos: base64Strings});
            photos = photos.map(photo => {
                if (photo.processed) {
                    return photo;
                }
                return {...photo, processed: true};
            });
            dispatch('processed', response.data);
        } catch (error) {
            console.error(error);
        }
    };
</script>

<Segment bind:selected={selectedOption} {options} on:change={handleSegmentChange}/>

<Modal bind:showModal successText="Yes" closeText="No" on:success={handleSuccess}>
    <Subtitle slot="header">Photos processing</Subtitle>
    <p>Some photos seem not to be processed yet.</p>
    <p>Do you want to process them ?</p>
</Modal>
