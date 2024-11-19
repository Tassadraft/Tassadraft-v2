<script>
    import Radio from '../shared/Radio.svelte';

    let radioValue = localStorage.getItem('currency') || 'euro';

    const handleChange = (event) => {
        localStorage.setItem('currency', event);
    };

    const currencies = [
        {
            value: 'euro',
            label: '€',
            selected: 'euro' === radioValue,
        },
        {
            value: 'dollar',
            label: '$',
            selected: 'dollar' === radioValue,
        },
    ];
</script>

<Radio {handleChange} options={currencies} fontSize={16} legend="Currency" bind:userSelected={radioValue} />
