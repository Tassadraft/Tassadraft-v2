<script>
    import Title from "../shared/Title.svelte";
    import Menu from "../menu/Menu.svelte";
    import {onMount} from "svelte";
    import axios from "../../axiosConfig.js";

    onMount(async () => {
        const {data: decks } = await axios.get('/api/auth/reserved/decks/me');
        console.log(decks);
    });
</script>

<Menu />
<Title title="Choose a deck" />
