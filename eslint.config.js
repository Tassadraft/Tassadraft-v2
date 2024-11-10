import eslintPluginSvelte3 from 'eslint-plugin-svelte3';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        ignores: ['public/build'],
    },
    {
        files: ['**/*.svelte'],
        plugins: {
            svelte3: eslintPluginSvelte3,
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        processor: 'svelte3/svelte3',
        rules: {
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['**/*.js'],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },
];
