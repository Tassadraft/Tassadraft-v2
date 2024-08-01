<script>
    import Segment from "../Segments/Segment.svelte";
    import Modal from '../shared/Modal.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import axios from '../../axiosConfig.js';
    import { createEventDispatcher } from 'svelte';
    import getBase64Strings from '../../service/base64Service.js';
    import { showToast } from '../../service/toastService.js';
    import Loader from '../shared/Loader.svelte';

    const dispatch = createEventDispatcher();

    export let photos = [];
    export let selectedOption = 'Photos';

    let showModal = false;
    let options = [];
    let loading = false;

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
            selectedOption = event.detail.value;
        }
    };

    const handleSuccess = async () => {
        try {
            loading = true;
            const base64Strings = await getBase64Strings(photos.filter(photo => !photo.processed));
            const response = await axios.post('/api/auth/reserved/process', {photos: base64Strings});
            loading = false;
            selectedOption = 'Cards';
            dispatch('processed', response.data);
        } catch (error) {
            loading = false;
            console.log(error);
            if (error.response?.status === 401) {
                showToast('You are not authorized to process photos', 'error');
            } else {
                showToast('An error occurred while processing photos', 'error');
            }
        }
    };
</script>

<Segment bind:selected={selectedOption} {options} on:change={handleSegmentChange}/>
<Loader bind:loading />

<Modal bind:showModal successText="Yes" closeText="No" on:success={handleSuccess}>
    <Subtitle slot="header">Photos processing</Subtitle>
    <p class="text-black dark:text-white">Some photos seem not to be processed yet.</p>
    <p class="text-black dark:text-white">Do you want to process them ?</p>
</Modal>
