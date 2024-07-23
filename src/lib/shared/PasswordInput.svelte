<script>
    import Input from './Input.svelte';

    export let value = '';
    export let name = 'password';
    export let placeholder = 'Password';
</script>

<Input bind:value={value} type="password" name={name}  />