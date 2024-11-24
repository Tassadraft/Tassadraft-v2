<script>
    import Menu from '../menu/Menu.svelte';
    import Form from '../shared/Form.svelte';
    import Title from '../shared/Title.svelte';
    import CurrencyRadio from '../settings/CurrencyRadio.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
    import LanguageRadio from '../settings/LanguageRadio.svelte';
    import { t } from 'svelte-i18n';
</script>

<Menu />

<Title title={$t('settings.title')} />

<Form submittable={false}>
    <ThemeSwitch title={$t('settings.theme')} />
    <CurrencyRadio />
    <LanguageRadio />
</Form>
