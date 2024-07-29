import axios from 'axios';

axios.defaults.baseURL = process.env.TASSADAPI_BASE_URL;

const token = localStorage.getItem('apiToken');
if (token) {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('/api/auth').then((response) => {
            if (response.status !== 200) {
                localStorage.removeItem('apiToken');
                axios.defaults.headers.common['Authorization'] = '';
                throw new Error('Invalid token');
            }
        });
        try {
            axios.get('/api/auth/reserved').then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('subscribed', 'true');
                } else {
                    localStorage.setItem('subscribed', 'false');
                }
            });
        } catch (error) {
            localStorage.setItem('subscribed', 'false');
        }
    } catch (error) {
        localStorage.removeItem('apiToken');
        axios.defaults.headers.common['Authorization'] = '';
    }
}

export default axios;
