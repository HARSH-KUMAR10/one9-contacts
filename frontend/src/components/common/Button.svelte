<script>
  export let text = "";
  export let type = "button";
  export let disabled = false;
  export let onClick = () => {};
  export let className = "";
</script>

<button {type} {disabled} on:click={onClick} class="btn {className}">
  {text}
</button>

<style>
  .btn {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-blue);
    color: var(--color-white);
    border: none;
    border-radius: 4px;
    font-size: var(--font-medium);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn:hover:not(:disabled) {
    opacity: 0.9;
    transform: scale(1.02);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn:active:not(:disabled) {
    transform: scale(0.98);
  }
</style>
