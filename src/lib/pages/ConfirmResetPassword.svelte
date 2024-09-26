<script>
  import Form from '../shared/Form.svelte';
  import PasswordInput from '../shared/PasswordInput.svelte';
  import Title from '../shared/Title.svelte';
  import Menu from '../menu/Menu.svelte';
  import { showToast, storeToast } from '../../service/toastService.js';

  export let token = '';

  let password = '';
  let confirmPassword = '';
  let canSubmit = false;
  let message = '';

  const checkPassword = () => {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    } else if (!password.match(/[a-z]/)) {
      return 'Password must contain at least one lowercase letter';
    } else if (!password.match(/[A-Z]/)) {
      return 'Password must contain at least one uppercase letter';
    } else if (!password.match(/[0-9]/)) {
      return 'Password must contain at least one number';
    } else if (!password.match(/[^a-zA-Z0-9]/)) {
      return 'Password must contain at least one special character';
    } else {
      return '';
    }
  };

  const handleSuccess = () => {
    storeToast('Password reset successfully');
    window.location.href = '/login';
  };

  const handleFailure = (response) => {
    showToast(response, 'error');
  };

  $: {
    message = checkPassword();
    canSubmit = password === confirmPassword && message === '';
  }
</script>

<Menu />

<Title title="Reset Password" />

<Form
  action={`/api/reset-password/confirm/${token}`}
  method="POST"
  {handleSuccess}
  {handleFailure}
  bind:submittable={canSubmit}
>
  <PasswordInput name="password" label="Password" bind:value={password} />
  <PasswordInput
    name="confirmPassword"
    label="Confirm Password"
    bind:value={confirmPassword}
  />
</Form>

{#if message}
  <p class="text-red-500 text-sm mt-2">{message}</p>
{/if}
