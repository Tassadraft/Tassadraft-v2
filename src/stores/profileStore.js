import { writable } from 'svelte/store';
import axios from 'axios';

export const profile = writable(null);

export function setProfile(user) {
    profile.set(user);
}

export async function updateProfile(profile = null) {
    try {
        if (!profile) {
            const { data: fetchedProfile } = await axios.get('/api/auth/profile');
            profile = fetchedProfile;
        }
        setProfile(profile);
    } catch (e) {
        throw new Error();
    }
}

export function clearProfile() {
    profile.set(null);
}
