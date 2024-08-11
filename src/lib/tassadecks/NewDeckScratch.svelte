<script>
import Title from "../shared/Title.svelte";
import Menu from "../menu/Menu.svelte";
import Form from "../shared/Form.svelte";
import Input from "../shared/Input.svelte";
</script>

<Menu />
<Title title="New Deck from scratch" />

<Form>
    <Input label="Deck name" type="text" />
</Form>
