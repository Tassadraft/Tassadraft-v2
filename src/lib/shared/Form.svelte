<script>
    import axios from 'axios';
    import Button from './Button.svelte';

    export let method = 'GET';
    export let action = '';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const url = form.action;
    };
</script>

<form action={action} on:submit={handleSubmit} method="{method}">
    <slot></slot>
    <Button type="submit">Submit</Button>
</form>
