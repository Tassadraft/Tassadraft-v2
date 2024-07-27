<script>
    import {onMount} from 'svelte';
    import Menu from '../menu/Menu.svelte';
    import axios from '../../axiosConfig';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';

    let username = '';
    let email = '';
    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';
    let subscriptionName = '';

    onMount(async () => {
        document.title = 'Account';
        try {
            const { data: response } = await axios.get('/api/auth/account');
            username = response.username;
            email = response.email;
            if (response.subscription) {
                subscriptionEndsOn = new Date(response.subscription.endAt).toLocaleDateString();
                subscriptionCreatedOn = new Date(response.subscription.createdAt).toLocaleDateString();
                subscriptionName = response.subscription.productName;
            }
        } catch(e) {
            console.log(e);
        }
    });
</script>

<div class="flex justify-start">
    <div class="mt-3">
        <Menu />
    </div>
</div>

<Title>Account</Title>

<Form submitable={false}>
    <Input label="Username" bind:value={username} disabled={true}/>
    <Input label="Email" bind:value={email} disabled={true}/>
    {#if subscriptionName && subscriptionEndsOn && subscriptionCreatedOn}
        <Input label="Subscription" bind:value={subscriptionName} disabled={true}/>
        <Input label="Subscription ends on" bind:value={subscriptionEndsOn} disabled={true}/>
        <Input label="Subscription created on" bind:value={subscriptionCreatedOn} disabled={true}/>
    {/if}
</Form>
