<script>
    import { onMount } from 'svelte';
    import { Router, Route } from 'svelte-routing';
    import Homepage from './lib/pages/Home.svelte';
    import Tassadraft from './lib/pages/Tassadraft.svelte';
    import Settings from './lib/pages/Settings.svelte';
    import Login from './lib/pages/Login.svelte';
    import Logout from './lib/pages/Logout.svelte';
    import Tassadecks from './lib/pages/Tassadecks.svelte';
    import Deck from './lib/tassadecks/editor/Editor.svelte';
    import NewDeck from './lib/tassadecks/NewDeck.svelte';
    import MyDecks from './lib/tassadecks/MyDecks.svelte';
    import BrowseDecks from './lib/tassadecks/BrowseDecks.svelte';
    import ResetPassword from './lib/pages/ResetPassword.svelte';
    import ConfirmResetPassword from './lib/pages/ConfirmResetPassword.svelte';
    import { defineCustomElements } from '@ionic/pwa-elements/loader';
    import Subscribe from './lib/pages/Subscribe.svelte';
    import Forbidden from './lib/pages/Forbidden.svelte';
    import { updateProfile, profile } from './stores/profileStore.js';
    import NotFound from './lib/pages/NotFound.svelte';
    import axios from 'axios';
    import Profile from './lib/pages/Profile.svelte';
    import Contact from './lib/pages/Contact.svelte';
    import Legals from './lib/pages/Legals.svelte';

    export let url = '';

    const logInformations = async (token) => {
        const tokenExpiresAt = localStorage.getItem('apiTokenExpiration');
        if (tokenExpiresAt && new Date(tokenExpiresAt) < new Date()) {
            localStorage.removeItem('apiToken');
            localStorage.removeItem('apiTokenExpiration');
            localStorage.removeItem('subscribed');
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios
            .get('/api/auth')
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Invalid token');
                }
            })
            .catch(() => {
                localStorage.removeItem('apiToken');
                axios.defaults.headers.common['Authorization'] = '';
            });
        axios
            .get('/api/auth/reserved')
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('subscribed', 'true');
                } else {
                    localStorage.setItem('subscribed', 'false');
                }
            })
            .catch(() => {
                localStorage.setItem('subscribed', 'false');
            });
    };

    onMount(async () => {
        axios.defaults.baseURL = process.env.VITE_TASSADAPI_BASE_URL;
        await defineCustomElements(window);

        const theme = localStorage.getItem('theme');
        if (theme !== 'light' && theme !== 'dark') {
            localStorage.setItem('theme', 'light');
        }
        const currency = localStorage.getItem('currency');
        if (currency !== 'dollar' && currency !== 'euro') {
            localStorage.setItem('currency', 'euro');
        }

        const token = localStorage.getItem('apiToken');
        if (token) {
            await logInformations(token);
            await updateProfile();
        }
    });
</script>

<main class="bg-gray-200 dark:bg-gray-900 text-black dark:text-white min-h-screen min-w-screen px-3.5">
    <Router {url}>
        <div>
            <Route path="/"><Homepage /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/subscribe"><Subscribe /></Route>
            <Route path="/settings"><Settings /></Route>

            {#if $profile}
                <Route path="/tassadraft"><Tassadraft /></Route>
                <Route path="/tassadecks"><Tassadecks /></Route>
                <Route path="/profile"><Profile /></Route>
                <Route path="/reset-password"><ResetPassword /></Route>
                <Route path="/reset-password/confirm/:token" let:params><ConfirmResetPassword {...params} /></Route>
                <Route path="/logout"><Logout /></Route>

                <Route path="/decks/edit/:deckId" let:params><Deck {...params} /></Route>
                <Route path="/decks/new"><NewDeck /></Route>
                <Route path="/decks/me"><MyDecks /></Route>
                <Route path="/decks"><BrowseDecks /></Route>

                <Route path="/contact"><Contact /></Route>
                <Route path="/legals"><Legals /></Route>
            {:else}
                <Route path="/tassadraft"><Forbidden /></Route>
                <Route path="/tassadecks"><Forbidden /></Route>
                <Route path="/profile"><Forbidden /></Route>
                <Route path="/decks/edit/:deckId"><Forbidden /></Route>
                <Route path="/decks/new"><Forbidden /></Route>
                <Route path="/decks/me"><Forbidden /></Route>
                <Route path="/decks"><Forbidden /></Route>
                <Route path="/contact"><Forbidden /></Route>
                <Route path="/legals"><Forbidden /></Route>
            {/if}

            <Route path="*"><NotFound /></Route>
        </div>
    </Router>
</main>
