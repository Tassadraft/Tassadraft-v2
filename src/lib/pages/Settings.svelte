<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Form from '../shared/Form.svelte';
    import Title from '../shared/Title.svelte';
    import Radio from '../shared/Radio.svelte';

    let radioValue;

    onMount(() => {
        document.title = 'Settings';
    });

    const handleCurrencyChange = (e) => {
        console.log(e);
    };

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
    <Radio {options} fontSize={16} legend='Select a starter Pokemon' bind:userSelected={radioValue}/>
    <p>
        {radioValue} is selected
    </p>
</Form>
