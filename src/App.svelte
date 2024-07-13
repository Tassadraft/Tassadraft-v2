<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import Menu from './lib/Menu.svelte';
    import ThemeSwitch from './lib/ThemeSwitch.svelte';

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

        if (localStorage.getItem('theme') !== 'light' || localStorage.getItem('theme') !== 'dark') {
            localStorage.setItem('theme', 'light');
        }

    })
</script>

<Menu />
<ThemeSwitch />
