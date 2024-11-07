<script>
    import { onMount } from 'svelte';
    import { Router, Route } from 'svelte-routing';
    import Homepage from './lib/pages/Home.svelte';
    import Tassadraft from './lib/pages/Tassadraft.svelte';
    import Settings from './lib/pages/Settings.svelte';
    import Login from './lib/pages/Login.svelte';
    import Account from './lib/pages/Account.svelte';
    import Logout from './lib/pages/Logout.svelte';
    import { showStoredToasts } from './service/toastService.js';
    import Tassadecks from './lib/pages/Tassadecks.svelte';
    import Deck from './lib/tassadecks/Editor.svelte';
    import NewDeck from './lib/tassadecks/NewDeck.svelte';
    import MyDecks from './lib/tassadecks/MyDecks.svelte';
    import NewDeckScratch from './lib/tassadecks/NewDeckScratch.svelte';
    import NewDeckUpload from './lib/tassadecks/NewDeckUpload.svelte';
    import BrowseDecks from './lib/tassadecks/BrowseDecks.svelte';
    import ResetPassword from './lib/pages/ResetPassword.svelte';
    import ConfirmResetPassword from './lib/pages/ConfirmResetPassword.svelte';
    import { defineCustomElements } from '@ionic/pwa-elements/loader';

    export let url = '';

    onMount(async () => {
        await defineCustomElements(window);

        const theme = localStorage.getItem('theme');
        if (theme !== 'light' && theme !== 'dark') {
            localStorage.setItem('theme', 'light');
        }
        const currency = localStorage.getItem('currency');
        if (currency !== 'dollar' && currency !== 'euro') {
            localStorage.setItem('currency', 'euro');
        }
        const languageCode = localStorage.getItem('languageCode');
        if (languageCode !== 'en' && languageCode !== 'fr') {
            localStorage.setItem('languageCode', 'en');
        }
        showStoredToasts();
    });

    document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
</script>

<main class="bg-gray-200 dark:bg-gray-900 text-black dark:text-white min-h-screen min-w-screen px-3.5">
    <Router {url}>
        <div>
            <Route path="/"><Homepage /></Route>
            <Route path="/tassadraft"><Tassadraft /></Route>
            <Route path="/tassadecks"><Tassadecks /></Route>
            <Route path="/settings"><Settings /></Route>
            <Route path="/account"><Account /></Route>
            <Route path="/reset-password"><ResetPassword /></Route>
            <Route path="/reset-password/confirm/:token" let:params><ConfirmResetPassword {...params} /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/logout"><Logout /></Route>

            <Route path="/decks/edit/:deckId" let:params><Deck {...params} /></Route>
            <Route path="/decks/new"><NewDeck /></Route>
            <Route path="/decks/new/scratch"><NewDeckScratch /></Route>
            <Route path="/decks/new/upload"><NewDeckUpload /></Route>
            <Route path="/decks/me"><MyDecks /></Route>
            <Route path="/decks"><BrowseDecks /></Route>
        </div>
    </Router>
</main>
