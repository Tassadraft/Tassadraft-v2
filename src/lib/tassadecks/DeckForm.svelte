<script>
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Switch from '../shared/Switch.svelte';
    import FileUpload from '../shared/FileUpload.svelte';
    import { showToast, storeToast } from '../../service/toastService.js';
    import { onMount } from 'svelte';
    import axios from '../../axiosConfig.js';
    import Select from '../shared/Select.svelte';
    import { capitalizeFirstChar } from '../../service/stringService.js';

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

    const handleSuccess = (response) => {
        storeToast(response.message, 'success');
        window.location = `/decks/edit/${response.deckId}`;
    };

    const handleError = (error) => {
        showToast(error, 'error');
    };
</script>

<Form
    method="POST"
    action={`/api/auth/reserved/decks/${deck.id > 0 ? `edit/${deck.id}` : 'new'}?languageCode=${localStorage.getItem('languageCode')}`}
    {handleSuccess}
    handleFailure={handleError}
>
    <Input label="Name" type="text" name="name" bind:value={deck.name} required={true} />
    <Input label="Description" type="text" name="description" bind:value={deck.description} />
    {#if supportedFormats.length}
        <div class="mb-5">
            <Select bind:options={supportedFormats} bind:selectedOption={selectedFormat} name="format" />
        </div>
    {/if}
    <Switch size="6" name="public" bind:value={deck.public} label="Public" />
    <div class="mt-3 mb-3">
        <Switch size="6" name="enabled" bind:value={deck.enabled} label="Enabled" />
    </div>
    {#if !scratch}
        <FileUpload name="file" title="Import deck list file" accept="txt" />
    {/if}
</Form>
