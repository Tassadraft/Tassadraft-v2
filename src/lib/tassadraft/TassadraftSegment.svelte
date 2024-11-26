<script>
    import Segment from '../shared/Segment.svelte';
    import Modal from '../shared/Modal.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import axios from '../../axiosConfig.js';
    import { createEventDispatcher } from 'svelte';
    import getBase64Strings from '../../service/base64Service.js';
    import { showToast } from '../../service/toastService.js';
    import Loader from '../shared/Loader.svelte';
    import { t } from 'svelte-i18n';

    const dispatch = createEventDispatcher();

    export let photos = [];
    export let selectedOption;

    let showModal = false;
    let options = [];
    let loading = false;

    $: {
        options = [
            {
                name: $t('tassadraft.photos'),
                value: 'photos',
                disabled: selectedOption === 'photos' },
            {
                name: $t('tassadraft.cards'),
                value: 'cards',
                disabled: selectedOption === 'cards' || photos.length === 0,
                disabledMessage: photos.length ? '' : $t('tassadraft.no-photo'),
            },
        ];
    }

    const handleSegmentChange = async (event) => {
        if (selectedOption === 'photos' && photos.filter((photo) => !photo.processed).length !== 0) {
            showModal = true;
        } else {
            selectedOption = event.detail.value;
        }
    };

    const handleSuccess = async () => {
        showModal = false;
        try {
            loading = true;
            const base64Strings = await getBase64Strings(photos.filter((photo) => !photo.processed));
            const response = await axios.post(`/api/auth/reserved/process?languageCode=${localStorage.getItem('languageCode')}`, {
                photos: base64Strings,
            });
            loading = false;
            selectedOption = 'cards';
            dispatch('processed', response.data);
        } catch (error) {
            loading = false;
            if (error.response?.status === 401) {
                showToast($t('toast.photo.unauthorized'), 'error');
            } else {
                showToast($t('toast.photo.error'), 'error');
            }
        }
    };
</script>

<Segment bind:selected={selectedOption} {options} on:change={handleSegmentChange} />
<Loader bind:loading />

<Modal bind:showModal successText={$t('common.yes')} closeText={$t('common.no')} on:success={handleSuccess}>
    <Subtitle slot="header">{$t('tassadraft.process.modal.title')}</Subtitle>
    <p class="text-black dark:text-white">{$t('tassadraft.process.modal.text')}</p>
    <p class="text-black dark:text-white">{$t('tassadraft.process.modal.question')}</p>
</Modal>
