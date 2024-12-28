<script>
    import Title from '../shared/Title.svelte';
    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Loader from '../shared/Loader.svelte';
    import Success from '../shared/Success.svelte';
    import Failure from '../shared/Failure.svelte';
    import { updateProfile } from "../../stores/profileStore.js";
    import {showToast} from "../../services/toastService.js";

    let loading = true;
    let success = false;
    let failure = false;

    onMount(async () => {
        try {
            await axios.get('/api/auth/subscribe/session/activate');
            showToast($t('toast.subscribe.success.success'));
            success = true;
            await updateProfile();
        } catch (e) {
            showToast($t('toast.subscribe.success.error'), 'error');
            failure = true;
        }
        loading = false;
    });
</script>

<Title title={$t(`subscribe.${failure ? 'error' : 'success'}.title`)} />

<Loader bind:loading />

<div class="h-screen w-full absolute top-0 left-0 pointer-events-none flex justify-center items-center">
    {#if success}
        <Success />
    {:else if failure}
        <Failure />
    {/if}
</div>
