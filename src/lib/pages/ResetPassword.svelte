<script>
  import Title from '../shared/Title.svelte';
  import Form from '../shared/Form.svelte';
  import Input from '../shared/Input.svelte';
  import { onMount } from 'svelte';
  import axios from '../../axiosConfig.js';

  let email = '';
  let disabled = false;

  onMount(async () => {
    try {
      const { data } = await axios.get('/api/auth/reset-password');
      email = data.email;
      disabled = true;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<Title title="Reset Password" />

<Form action="/api/auth/reset-password" method="POST">
  <Input
    label="Enter your email"
    type="email"
    name="email"
    bind:value={email}
    placeholder="toto@gmail.com"
    required={true}
    {disabled}
  />
</Form>
