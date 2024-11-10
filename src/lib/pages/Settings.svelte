<script>
    import Menu from '../menu/Menu.svelte';
    import Form from '../shared/Form.svelte';
    import Title from '../shared/Title.svelte';
    import CurrencyRadio from '../settings/CurrencyRadio.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
    import LanguageRadio from '../settings/LanguageRadio.svelte';
</script>

<Menu />

<Title title="Settings" />

<Form submittable={false}>
    <ThemeSwitch title="Theme" />
    <CurrencyRadio />
    <LanguageRadio />
</Form>
