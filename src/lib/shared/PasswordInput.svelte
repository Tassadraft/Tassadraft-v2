<script>
    import Input from './Input.svelte';
    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';

    export let value = '';
    export let name = 'password';
    export let required = false;
    export let label = '';

    let placeholder;

    onMount(() => {
        placeholder = $t('common.password.placeholder');
        if (!label) {
            label = $t('common.password.label');
        }
    });
</script>

<Input bind:value type="password" {name} {placeholder} {label} {required} />
