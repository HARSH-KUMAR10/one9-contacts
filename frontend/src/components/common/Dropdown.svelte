<script>
  import { onMount } from "svelte";

  export let items = [];
  export let onSelect = () => {};

  let container;

  onMount(() => {
    if (container) {
      const rect = container.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        container.style.top = "auto";
        container.style.bottom = "100%";
      }
    }
  });
</script>

<div class="dropdown-menu" bind:this={container}>
  {#each items as item (item.id || item)}
    <button class="dropdown-item medium" on:click={() => onSelect(item)}>
      {item.label || item}
    </button>
  {/each}
</div>

<style>
  .dropdown-menu {
    position: absolute;
    background-color: #333;
    border: 1px solid var(--color-blue);
    border-radius: 4px;
    min-width: 150px;
    z-index: 100;
    top: 100%;
    margin-top: var(--spacing-xs);
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    background: none;
    border: none;
    color: var(--color-white);
    text-align: left;
    cursor: pointer;
    font-size: var(--font-medium);
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background-color: #444;
    color: var(--color-blue);
  }

  .dropdown-item:not(:last-child) {
    border-bottom: 1px solid #444;
  }
</style>
