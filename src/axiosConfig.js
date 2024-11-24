import axios from 'axios';
import { navigate } from "svelte-routing";

axios.defaults.baseURL = process.env.VITE_TASSADAPI_BASE_URL;

const token = localStorage.getItem('apiToken');
if (token) {
    const tokenExpiresAt = localStorage.getItem('apiTokenExpiration');
    if (tokenExpiresAt && new Date(tokenExpiresAt) < new Date()) {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('apiTokenExpiration');
        localStorage.removeItem('subscribed');
        navigate('/login');
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
        .get('/api/auth')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Invalid token');
            }
        })
        .catch((error) => {
            localStorage.removeItem('apiToken');
            axios.defaults.headers.common['Authorization'] = '';
            navigate('/login');
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
        .catch((error) => {
            localStorage.setItem('subscribed', 'false');
        });
} else if (document.location.pathname !== '/login' && !document.location.pathname.includes('/reset-password')) {
    navigate('/login');
}

export default axios;
