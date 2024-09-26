<script>
  import { createEventDispatcher } from 'svelte';

  export let options = [];
  export let selectedOption = null;
  export let name = null;

  const dispatch = createEventDispatcher();

  const handleSelect = (e) => {
    selectedOption = options.find((option) => {
      return option.value === Number(e.target.value);
    });
    dispatch('change');
  };
</script>

<select
  {name}
  class="w-full p-2 border border-gray-300 rounded-lg"
  on:change={handleSelect}
>
  {#each options as option}
    <option
      value={option.value}
      selected={selectedOption.value === option.value}>{option.label}</option
    >
  {/each}
</select>
