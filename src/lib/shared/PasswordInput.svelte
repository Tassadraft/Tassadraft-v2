<script>
    import Input from './Input.svelte';
    import { t } from 'svelte-i18n';

    export let value = '';
    export let name = 'password';
    export let required = false;

    let placeholder;
    let label;

    $: {
        placeholder = $t('common.password.placeholder');
        label = $t('common.password.label');
    }
</script>

<Input bind:value type="password" {name} {placeholder} {label} {required} />
