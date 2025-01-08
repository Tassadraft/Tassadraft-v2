<script>
    import axios from 'axios';
    import Button from './Button.svelte';
    import Loader from './Loader.svelte';
    import Icon from './Icon.svelte';
    import { t } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';
    import FormBackground from './background/FormBackground.svelte';
    import { language } from '../../stores/languageStore.js';

    const dispatch = createEventDispatcher();

    export let method = 'GET';
    export let action = '';
    export let isValid = false;
    export let submittable = true;
    export let showBackground = true;

    let loading = false;
    let isSendButtonDisabled = false;

    const handleSubmit = async (event) => {
        event.preventDefault();
        loading = true;
        const form = event.target;
        const formData = new FormData(form);

        const formDataObj = {
            language: $language,
        };

        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        try {
            const response = await axios({
                method,
                url: `${axios.defaults.baseURL}${action}`,
                data: method === 'GET' ? null : formData,
                params: method === 'GET' ? formDataObj : null,
                headers: method !== 'GET' ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            loading = false;
            dispatch('success', response.data);
        } catch (error) {
            loading = false;
            dispatch('error', error.message);
        }
    };

    $: isSendButtonDisabled = !isValid;
</script>

{#if showBackground}
    <FormBackground />
{/if}

<form
    {action}
    on:submit={handleSubmit}
    {method}
    class="relative z-10 bg-gray-200 dark:bg-gray-700 rounded-2xl p-2 md:p-6 shadow-lg m-auto {showBackground ? 'mt-24' : ''}"
    style="max-width: 500px;"
>
    <slot />
    {#if submittable}
        <div class="w-full flex justify-between mt-4">
            <div>
                <slot name="other-option" />
            </div>
            <Button
                type="submit"
                bind:disabled={isSendButtonDisabled}
                customStyle={true}
                additionalStyle="bg-green-700 {isSendButtonDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:bg-green-800'} transition-all duration-300 py-2 px-4 rounded-xl text-2xl font-bold"
            >
                <div class="flex flex-row items-center gap-3">
                    <p class="text-white">{$t('common.submit')}</p>
                    <div class="text-primary-500">
                        <Icon name="send" />
                    </div>
                </div>
            </Button>
        </div>
    {/if}
    <Loader bind:loading />
</form>
