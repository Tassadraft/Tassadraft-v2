<script>
    import Form from '../shared/Form.svelte';
    import Title from '../shared/Title.svelte';
    import CurrencyRadio from '../settings/CurrencyRadio.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
    import { t } from 'svelte-i18n';
    import LanguageSetting from '../settings/LanguageSetting.svelte';
</script>

<Title title={$t('settings.title')} hasBackground={true} />

<Form submittable={false}>
    <ThemeSwitch title={$t('settings.theme')} />
    <CurrencyRadio />
    <LanguageSetting />
</Form>
