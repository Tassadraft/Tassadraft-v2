import { writable } from 'svelte/store';
import axios from 'axios';

export const profile = writable(null);

export function setProfile(user) {
    profile.set(user);
}

export async function updateProfile() {
    try {
        const { data: profile } = await axios.get('/api/auth/profile');
        setProfile(profile);
    } catch (e) {
        throw new Error();
    }
}

export function clearProfile() {
    profile.set(null);
}
