<script>
    import Input from './Input.svelte';

    export let value = '';
    export let name = 'password';
    export let placeholder = '********';
    export let label = 'Password';
    export let required = false;
</script>

<Input bind:value type="password" {name} {placeholder} {label} {required} />
