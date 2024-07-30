<script>
    import Menu from '../menu/Menu.svelte';
    import Form from '../shared/Form.svelte';
    import Title from '../shared/Title.svelte';
    import CurrencyRadio from '../settings/CurrencyRadio.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';
</script>

<Menu />

<Title title="Settings" />

<Form submitable={false}>
    <ThemeSwitch title="Theme" />
    <CurrencyRadio />
</Form>
