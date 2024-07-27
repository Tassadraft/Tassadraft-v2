<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Form from '../shared/Form.svelte';
    import Title from '../shared/Title.svelte';
    import Radio from '../shared/Radio.svelte';
    import CurrencyRadio from '../settings/CurrencyRadio.svelte';
    import ThemeSwitch from '../shared/ThemeSwitch.svelte';

    let radioValue;

    onMount(() => {
        document.title = 'Settings';
    });

    const options = [{
        value: 'green',
        label: 'Bulbasaur',
    }, {
        value: 'red',
        label: 'Charmander',
    }, {
        value: 'blue',
        label: 'Squirtle',
    }]
</script>

<div class="flex justify-start">
    <div class="mt-3">
        <Menu />
    </div>
</div>

<Title>Settings</Title>

<Form submitable={false}>
    <ThemeSwitch title="Theme" />
    <CurrencyRadio />
</Form>
