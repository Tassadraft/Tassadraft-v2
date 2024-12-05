<script>
    import axios from 'axios';
    import Button from './Button.svelte';
    import Loader from './Loader.svelte';
    import Icon from './Icon.svelte';
    import { t } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let method = 'GET';
    export let action = '';
    export let submittable = true;

    let loading = false;

    const handleSubmit = async (event) => {
        event.preventDefault();
        loading = true;
        const form = event.target;
        const formData = new FormData(form);

        const formDataObj = {
            languageCode: localStorage.getItem('languageCode'),
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
</script>

<form {action} on:submit={handleSubmit} {method} class="bg-gray-200 dark:bg-gray-700 rounded-2xl p-3 shadow">
    <slot />
    {#if submittable}
        <div class="w-full flex justify-end">
            <Button type="submit" additionalStyle="bg-green-700 hover:bg-green-800 rounded-lg p-2">
                <div class="flex flex-row items-center gap-3">
                    <p class="text-white">{$t('common.submit')}</p>
                    <Icon name="send" />
                </div>
            </Button>
        </div>
    {/if}
    <Loader bind:loading />
</form>
