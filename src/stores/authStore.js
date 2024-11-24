import { writable } from 'svelte/store';
import axios from '../axiosConfig.js';

export const currentAccount = writable(null);

export function setCurrentAccount(user) {
    currentAccount.set(user);
}

export async function updateAccount() {
    try {
        const { data: account } = await axios.get('/api/auth/account');
        setCurrentAccount(account);
    } catch (e) {
        throw new Error();
    }
}

export function clearCurrentAccount() {
    currentAccount.set(null);
}
