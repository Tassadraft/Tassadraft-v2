<script>
    import Radio from '../shared/Radio.svelte';
    import { t } from 'svelte-i18n';

    let radioValue = localStorage.getItem('currency') || 'euro';
    let currencies = [];

    const handleChange = (event) => {
        localStorage.setItem('currency', event);
    };

    $: currencies = [
        {
            value: 'euro',
            label: $t('settings.currency.euro'),
            selected: 'euro' === radioValue,
        },
        {
            value: 'dollar',
            label: $t('settings.currency.dollar'),
            selected: 'dollar' === radioValue,
        },
    ];
</script>

<Radio {handleChange} options={currencies} fontSize={16} legend={$t('settings.currency.title')} bind:userSelected={radioValue} />
