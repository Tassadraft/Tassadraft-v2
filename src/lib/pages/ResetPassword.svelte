<script>
  import Title from '../shared/Title.svelte';
  import Form from '../shared/Form.svelte';
  import Input from '../shared/Input.svelte';
  import { onMount } from 'svelte';
  import axios from '../../axiosConfig.js';
  import Menu from '../menu/Menu.svelte';
  import { showToast } from '../../service/toastService.js';

  let email = '';
  let readonly = false;

  onMount(async () => {
    try {
      const { data } = await axios.get('/api/auth/get-email');
      email = data.email;
      readonly = true;
    } catch (error) {
      console.error(error);
    }
  });

  const handleSuccess = () => {
    showToast('An email has been sent to reset your password');
  };

  const handleFailure = () => {
    showToast('An error occurred', 'error');
  };
</script>

<Menu />

<Title title="Reset Password" />

<Form
  {handleSuccess}
  {handleFailure}
  action="/api/reset-password/send-mail"
  method="POST"
>
  <Input
    label="Enter your email"
    type="email"
    name="email"
    bind:value={email}
    placeholder="toto@gmail.com"
    required={true}
    {readonly}
  />
</Form>
