<script>
    import Radio from '../shared/Radio.svelte';

    let radioValue;

    const handleChange = (event) => {
        localStorage.setItem('currency', event);
    }

    const currencies = [
        {
            value: 'euro',
            label: '€',
            selected: true,
        }, {
            value: 'dollar',
            label: '$',
        },
    ];
</script>

<Radio handleChange={handleChange} options={currencies} fontSize={16} legend='Currency' bind:userSelected={radioValue}/>
