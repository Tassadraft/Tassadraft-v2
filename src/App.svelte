<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { Router, Link, Route } from "svelte-routing";
    import Homepage from './lib/pages/Homepage.svelte';

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

    })
</script>

<Router {url}>
    <div>
        <Route path="/"><Homepage /></Route>
    </div>
</Router>
