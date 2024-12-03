import axios from 'axios';
import { navigate } from 'svelte-routing';

axios.defaults.baseURL = process.env.VITE_TASSADAPI_BASE_URL;

export default axios;
