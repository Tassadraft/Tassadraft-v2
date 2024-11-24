<script>
    import Radio from '../shared/Radio.svelte';
    import { locale, t } from 'svelte-i18n';

    let radioValue = localStorage.getItem('languageCode');
    let languages = [];

    const handleChange = (event) => {
        localStorage.setItem('languageCode', event);
        locale.set(event);
    };

    $: languages = [
        {
            value: 'en',
            label: $t('settings.language.english'),
            selected: 'en' === radioValue,
        },
        {
            value: 'fr',
            label: $t('settings.language.french'),
            selected: 'fr' === radioValue,
        },
    ];
</script>

<Radio {handleChange} options={languages} fontSize={16} legend={$t('settings.language.title')} bind:userSelected={radioValue} />
