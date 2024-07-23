<script>
    import Menu from '../menu/Menu.svelte';
    import { onMount } from 'svelte';
    import Form from '../shared/Form.svelte';
    import Input from '../shared/Input.svelte';

    onMount(() => {
        document.title = 'Login';
    });
</script>

<div class="flex justify-start">
    <div class="mt-3">
        <Menu />
    </div>
</div>

<Form action="login" method="post">
    <Input type="email" name="gdf" placeholder="fff" label="ici" />
</Form>
