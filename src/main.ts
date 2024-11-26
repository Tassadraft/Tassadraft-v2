import './app.css';
import { init, register, locale } from 'svelte-i18n';
import App from './App.svelte';

const languageCode: string | null = localStorage.getItem('languageCode');
if (languageCode !== 'en' && languageCode !== 'fr') {
    localStorage.setItem('languageCode', 'en');
}

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));

init({
    fallbackLocale: 'en',
    initialLocale: localStorage.getItem('languageCode') || 'en',
});

locale.set(localStorage.getItem('languageCode'));

const app = new App({
    target: document.getElementById('app')!,
});

export default app;
