<script>
    import { onMount } from 'svelte';
    import { Router, Route } from "svelte-routing";
    import Homepage from './lib/pages/Homepage.svelte';
    import Tassadraft from "./lib/pages/Tassadraft.svelte";
    import Settings from './lib/pages/Settings.svelte';
    import Login from './lib/pages/Login.svelte';
    import Account from './lib/pages/Account.svelte';
    import Logout from './lib/pages/Logout.svelte';
    import { showStoredToasts } from './toastService.js';

    export let url = "";

    onMount(async () => {
        const theme = localStorage.getItem('theme');
        if (theme !== 'light' && theme !== 'dark') {
            localStorage.setItem('theme', 'light');
        }
        showStoredToasts();
    });

    document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
</script>

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
