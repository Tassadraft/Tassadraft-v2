<script>
  import Icon from './Icon.svelte';
  import Button from './Button.svelte';

  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let name = '';
  export let required = false;
  export let disabled = false;
  export let label = '';

  const realType = type;

  let focused = false;
  const classes = `block w-full px-3 py-2 mt-1 text-base text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${disabled ? 'bg-gray-300 dark:bg-gray-500' : ''}`;

  const typeWorkaround = (node) => (node.type = type);
  const switchType = () => (type = type === 'password' ? 'text' : 'password');
</script>

<div class="relative w-full mt-8 mb-5">
  <label
    for={name}
    class="absolute pointer-events-none z-10 transition-all duration-800 ease-in-out {focused ||
    value
      ? 'text-primary-500 bottom-11 left-1'
      : 'text-gray-500 bottom-2.5 left-3'}">{label}</label
  >
  {#if realType !== 'password'}
    <input
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      use:typeWorkaround
      bind:value
      placeholder={focused || value ? placeholder : ''}
      {name}
      {required}
      {disabled}
      class={classes}
    />
  {:else if type === 'password'}
    <input
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      use:typeWorkaround
      bind:value
      placeholder={focused || value ? placeholder : ''}
      {name}
      {required}
      {disabled}
      class={`${classes} pr-9`}
    />
    <Button
      additionalStyle="absolute top-2 right-2 cursor-pointer"
      on:click={switchType}
    >
      <Icon name="eye" />
    </Button>
  {:else}
    <input
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      use:typeWorkaround
      bind:value
      placeholder={focused || value ? placeholder : ''}
      {name}
      {required}
      {disabled}
      class={`${classes} pr-9`}
    />
    <Button
      additionalStyle="absolute top-2 right-2 cursor-pointer"
      on:click={switchType}
    >
      <Icon name="eyeSlash" />
    </Button>
  {/if}
</div>

<style>
  label {
    transition:
      bottom 0.8s ease,
      left 0.8s ease,
      color 0.8s ease;
  }
</style>
