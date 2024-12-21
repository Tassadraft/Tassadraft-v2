<script>
    import Radio from '../shared/Radio.svelte';
    import { locale, t } from 'svelte-i18n';

    let radioValue = localStorage.getItem('language');
    let languages = [];

    const handleChange = (event) => {
        localStorage.setItem('language', event);
        locale.set(event);
    };

    $: languages = [
        {
            value: 'en',
            label: 'English',
            selected: 'en' === radioValue,
        },
        {
            value: 'fr',
            label: 'Français',
            selected: 'fr' === radioValue,
        },
    ];
</script>

<Radio {handleChange} options={languages} fontSize={16} legend={$t('settings.language.title')} />
