<script>
  import axios from '../../axiosConfig.js';
  import Button from './Button.svelte';

  export let method = 'GET';
  export let action = '';
  export let handleSuccess = () => {};
  export let handleFailure = () => {};
  export let submittable = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        headers:
          method !== 'GET' ? { 'Content-Type': 'multipart/form-data' } : {},
      });
      handleSuccess(response.data);
    } catch (error) {
      handleFailure(error.message);
    }
  };
</script>

<form
  {action}
  on:submit={handleSubmit}
  {method}
  class="bg-gray-200 dark:bg-gray-700 rounded-2xl p-3 shadow"
>
  <slot />
  {#if submittable}
    <Button type="submit">Submit</Button>
  {/if}
</form>
