<script>
    import Title from "../shared/Title.svelte";
    import Menu from "../menu/Menu.svelte";
    import Input from "../shared/Input.svelte";
    import Form from "../shared/Form.svelte";
    import Switch from "../shared/Switch.svelte";

    let name = "";
    let description = "";
    let publicVisibility = false;
    let enabled = false;
</script>

<Menu />
<Title title="New Deck by upload" />

<Form>
    <Input label="Name" type="text" name="name" bind:value={name} />
    <Input label="Description" type="text" name="description" bind:value={description} />
    <div class="flex flex-row gap-3">
        <p>Public</p>
        <Switch size="6" name="public" bind:value={publicVisibility} />
    </div>
    <div class="flex flex-row gap-3 mt-3">
        <p>Enabled</p>
        <Switch size="6" name="public" bind:value={enabled} />
    </div>
</Form>
