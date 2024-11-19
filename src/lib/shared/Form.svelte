<script>
    import axios from '../../axiosConfig.js';
    import Button from './Button.svelte';
    import Loader from './Loader.svelte';
    import IconButton from './IconButton.svelte';
    import Icon from './Icon.svelte';

    export let method = 'GET';
    export let action = '';
    export let handleSuccess = () => {};
    export let handleFailure = () => {};
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
            console.log(axios.defaults.baseURL, process.env.VITE_TASSADAPI_BASE_URL)
            const response = await axios({
                method,
                url: `${axios.defaults.baseURL}${action}`,
                data: method === 'GET' ? null : formData,
                params: method === 'GET' ? formDataObj : null,
                headers: method !== 'GET' ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            loading = false;
            handleSuccess(response.data);
        } catch (error) {
            loading = false;
            handleFailure(error.message);
        }
    };
</script>

<form {action} on:submit={handleSubmit} {method} class="bg-gray-200 dark:bg-gray-700 rounded-2xl p-3 shadow">
    <slot />
    {#if submittable}
        <div class="w-full flex justify-end">
            <Button type="submit" additionalStyle="bg-green-700 hover:bg-green-800 rounded-md p-2">
                <div class="flex flex-row items-center gap-3">
                    <p class="text-white">Submit</p>
                    <Icon name="send" />
                </div>
            </Button>
        </div>
    {/if}
    <Loader bind:loading />
</form>
