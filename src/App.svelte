<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { Router, Route } from "svelte-routing";
    import Homepage from './lib/pages/Homepage.svelte';
    import Tassadraft from "./lib/pages/Tassadraft.svelte";
    import Settings from './lib/pages/Settings.svelte';
    import Login from './lib/pages/Login.svelte';

    export let url = "";

    axios.defaults.baseURL = process.env.TASSADAPI_BASE_URL;

    onMount(async () => {
        const token = localStorage.getItem('apiToken');
        if (token) {
            const response = await axios.get('/api/reserved');
            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                localStorage.removeItem('apiToken');
            }
        }

        const theme = localStorage.getItem('theme');
        if (theme !== 'light' && theme !== 'dark') {
            localStorage.setItem('theme', 'light');
        }

    });

    document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
</script>

<Router {url}>
    <div>
        <Route path="/"><Homepage /></Route>
        <Route path="/tassadraft"><Tassadraft /></Route>
        <Route path="/settings"><Settings /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/logout"><Settings /></Route>
    </div>
</Router>
