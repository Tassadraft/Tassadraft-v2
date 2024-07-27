import axios from 'axios';

axios.defaults.baseURL = process.env.TASSADAPI_BASE_URL;

const token = localStorage.getItem('apiToken');
if (token) {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/api/auth');
        if (response.status !== 200) {
            throw new Error('Invalid token');
        }
        try {
            await axios.get('/api/auth/reserved');
            localStorage.setItem('subscribed', 'true');
        } catch (error) {
            localStorage.setItem('subscribed', 'false');
        }
    } catch (error) {
        localStorage.removeItem('apiToken');
        axios.defaults.headers.common['Authorization'] = '';
    }
}

export default axios;
