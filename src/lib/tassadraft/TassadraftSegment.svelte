<script>
    import Segment from '../shared/Segment.svelte';
    import Modal from '../shared/Modal.svelte';
    import Subtitle from '../shared/Subtitle.svelte';
    import axios from 'axios';
    import { createEventDispatcher } from 'svelte';
    import getBase64Strings from '../../services/base64Service.js';
    import { showToast } from '../../services/toastService.js';
    import Loader from '../shared/Loader.svelte';
    import { t } from 'svelte-i18n';
    import ConfirmModal from '../shared/ConfirmModal.svelte';
    import { language } from '../../stores/languageStore.js';

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
                disabled: selectedOption === 'photos',
            },
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
            const response = await axios.post(`/api/auth/reserved/cards/process?language=${$language}`, {
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

<ConfirmModal bind:showModal on:success={handleSuccess}>
    <Subtitle slot="header">{$t('tassadraft.process.modal.title')}</Subtitle>
    <p>{$t('tassadraft.process.modal.text')}</p>
    <p>{$t('tassadraft.process.modal.question')}</p>
</ConfirmModal>
