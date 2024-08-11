<script>
    import Menu from "../menu/Menu.svelte";
    import Title from "../shared/Title.svelte";
    import {onMount} from "svelte";
    import axios from "../../axiosConfig.js";

    export let deckId = "";

    onMount(async () => {
        const {data: deck } = await axios.get(`/api/auth/reserved/decks/edit/${deckId}`);
        console.log(deck);
    });
</script>

<Menu />
<Title title="Deck editor" />
