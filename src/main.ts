import './app.css';
import {init, register} from "svelte-i18n";
import App from './App.svelte';

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));

init({
    fallbackLocale: "en",
    initialLocale: "en"
});

const app = new App({
    target: document.getElementById('app')!,
});

export default app;
