<script>
    import { onMount } from 'svelte';
    import { Router, Route } from "svelte-routing";
    import Homepage from './lib/pages/Homepage.svelte';
    import Tassadraft from "./lib/pages/Tassadraft.svelte";
    import Settings from './lib/pages/Settings.svelte';
    import Login from './lib/pages/Login.svelte';
    import Account from './lib/pages/Account.svelte';
    import Logout from './lib/pages/Logout.svelte';
    import { showStoredToasts } from './service/toastService.js';

    export let url = "";

    onMount(async () => {
        const theme = localStorage.getItem('theme');
        if (theme !== 'light' && theme !== 'dark') {
            localStorage.setItem('theme', 'light');
        }
        const currency = localStorage.getItem('currency');
        if (currency !== 'dollar' && currency !== 'euro') {
            localStorage.setItem('currency', 'euro');
        }
        showStoredToasts();
    });

    document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
</script>

<main class="bg-gray-300 dark:bg-gray-900 text-black dark:text-white min-h-screen min-w-screen px-3.5">
    <Router {url}>
        <div>
            <Route path="/"><Homepage /></Route>
            <Route path="/tassadraft"><Tassadraft /></Route>
            <Route path="/settings"><Settings /></Route>
            <Route path="/account"><Account /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/logout"><Logout /></Route>
        </div>
    </Router>
</main>
