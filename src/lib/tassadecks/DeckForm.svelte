<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Switch from '../shared/Switch.svelte';
    import FileUpload from '../shared/FileUpload.svelte';
    import { showToast } from '../../service/toastService.js';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Select from '../shared/Select.svelte';
    import { capitalizeFirstChar } from '../../service/stringService.js';
    import { navigate } from '../../stores/locationStore.js';
    import { t } from 'svelte-i18n';

    export let scratch = true;
    export let deck = {
        id: -1,
        name: '',
        description: '',
        public: false,
        enabled: false,
    };

    let supportedFormats = [];
    let selectedFormat = null;

    onMount(async () => {
        try {
            const { data } = await axios.get('/api/auth/reserved/decks/supported-formats');
            supportedFormats = data.map((format, index) => ({ value: index, label: capitalizeFirstChar(format) }));
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
</script>

<Form
    method="POST"
    action={`/api/auth/reserved/decks/${deck.id > 0 ? `edit/${deck.id}` : 'new'}?languageCode=${localStorage.getItem('languageCode')}`}
    on:success={handleSuccess}
    on:error={handleError}
>
    <Input
        label={$t('tassadecks.new.form.name.label')}
        placeholder={$t('tassadecks.new.form.name.placeholder')}
        type="text"
        name="name"
        bind:value={deck.name}
        required={true}
    />
    <Input
        label={$t('tassadecks.new.form.description.label')}
        placeholder={$t('tassadecks.new.form.description.placeholder')}
        type="text"
        name="description"
        bind:value={deck.description}
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
    {#if !scratch}
        <FileUpload name="file" accept="txt" title={$t('tassadecks.new.form.file.title')} description={$t('tassadecks.new.form.file.description')} />
    {/if}
</Form>
