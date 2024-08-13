<script>
    import Title from "../shared/Title.svelte";
    import Menu from "../menu/Menu.svelte";
    import { onMount } from "svelte";
    import axios from "../../axiosConfig.js";

    onMount(async () => {
        const {data: decks } = await axios.get(`/api/decks?languageCode=${localStorage.getItem('languageCode')}`);
        console.log(decks);
    });
</script>

<Menu />
<Title title="All decks" />
