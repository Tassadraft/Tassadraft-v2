<script>
    import { onMount } from 'svelte';
    import Menu from '../menu/Menu.svelte';
    import axios from '../../axiosConfig';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';
    import Title from '../shared/Title.svelte';
    import Link from '../shared/Link.svelte';

    let username = '';
    let email = '';
    let role = '';
    let subscriptionEndsOn = '';
    let subscriptionCreatedOn = '';
    let subscriptionName = '';

    onMount(async () => {
        try {
            const { data: response } = await axios.get('/api/auth/account');
            username = response.username;
            email = response.email;
            if (response.subscription) {
                subscriptionEndsOn = new Date(response.subscription.endAt).toLocaleDateString();
                subscriptionCreatedOn = new Date(response.subscription.createdAt).toLocaleDateString();
                subscriptionName = response.subscription.productName;
            }
        } catch (e) {
            console.error(e);
        }
    });
</script>

<Menu />

<Title title="Account" />

<Form submittable={false}>
    <Input label="Username" bind:value={username} disabled={true} />
    <Input label="Email" bind:value={email} disabled={true} />
    <Link href="/reset-password" className="text-primary-500 hover:text-white duration-300 transition-colors">Reset password</Link>
    {#if subscriptionName && subscriptionEndsOn && subscriptionCreatedOn}
        <Input label="Subscription" bind:value={subscriptionName} disabled={true} />
        <Input label="Subscription ends on" bind:value={subscriptionEndsOn} disabled={true} />
        <Input label="Subscription created on" bind:value={subscriptionCreatedOn} disabled={true} />
    {:else if role === 'user'}
        <Link href="https://api.tassadraft.com/subscribe" target="_blank">Subscribe</Link>
    {/if}
</Form>
