<script>
    import Radio from '../shared/Radio.svelte';

    let radioValue = localStorage.getItem('languageCode') || 'euro';

    const handleChange = (event) => {
        localStorage.setItem('languageCode', event);
    };

    const currencies = [
        {
            value: 'fr',
            label: 'French',
            selected: 'fr' === radioValue,
        }, {
            value: 'en',
            label: 'English',
            selected: 'en' === radioValue,
        },
    ];
</script>

<Radio {handleChange} options={currencies} fontSize={16} legend='Preferred language' bind:userSelected={radioValue}/>
