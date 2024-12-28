<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Switch from '../shared/Switch.svelte';
    import FileUpload from '../shared/FileUpload.svelte';
    import { showToast } from '../../services/toastService.js';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Select from '../shared/Select.svelte';
    import { navigate } from '../../stores/locationStore.js';
    import { t } from 'svelte-i18n';
    import { language } from '../../stores/languageStore.js';

    export let deck = {
        name: '',
        description: '',
        public: false,
        enabled: false,
    };

    let supportedFormats = [];
    let selectedFormat = null;
    let isValid = false;

    onMount(async () => {
        try {
            const { data } = await axios.get('/api/auth/reserved/decks/supported-formats');
            supportedFormats = data.map((format, index) => ({ value: index, label: format }));
            selectedFormat = supportedFormats[0];
        } catch (error) {
            console.error(error);
        }
    });

    const handleSuccess = (event) => {
        showToast(event.detail.message);
        navigate(`/decks/edit/${event.detail.deckId}`);
    };

    const handleError = (event) => {
        showToast(event.detail, 'error');
    };

    $: isValid = deck.name && (deck.description ? true : deck.description.length <= 1024) && selectedFormat;
</script>

<Form method="POST" action={`/api/auth/reserved/decks/new?language=${$language}`} on:success={handleSuccess} on:error={handleError} bind:isValid>
    <Input
        label={$t('tassadecks.new.form.name.label')}
        placeholder={$t('tassadecks.new.form.name.placeholder')}
        name="name"
        bind:value={deck.name}
        required={true}
        min={3}
        max={50}
    />
    <Input
        label={$t('tassadecks.new.form.description.label')}
        placeholder={$t('tassadecks.new.form.description.placeholder')}
        name="description"
        bind:value={deck.description}
        max={1024}
    />
    {#if supportedFormats.length}
        <div class="mb-5">
            <Select bind:options={supportedFormats} bind:selectedOption={selectedFormat} name="format" />
        </div>
    {/if}
    <Switch size="6" name="public" bind:value={deck.public} label={$t('common.public')} />
    <div class="mt-3 mb-3">
        <Switch size="6" name="enabled" bind:value={deck.enabled} label={$t('common.enabled')} />
    </div>
    <FileUpload name="file" accept="txt" title={$t('tassadecks.new.form.file.title')} description={$t('tassadecks.new.form.file.description')} />
</Form>
