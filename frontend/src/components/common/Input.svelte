<script>
  export let label = "";
  export let type = "text";
  export let placeholder = "";
  export let value = "";
  export let required = false;
  export let disabled = false;
  export let name = "";

  let inputElement;

  const handleChange = (e) => {
    value = e.target.value;
  };
</script>

<div class="input-group">
  {#if label}
    <label htmlFor={name} class="input-label">{label}</label>
  {/if}
  <input
    bind:this={inputElement}
    {type}
    {name}
    {value}
    {placeholder}
    {required}
    {disabled}
    on:change={handleChange}
    on:input={handleChange}
    class="input-field"
  />
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-md);
  }

  .input-label {
    font-size: var(--font-small);
    margin-bottom: var(--spacing-sm);
    color: var(--color-white);
    font-weight: bold;
  }

  .input-field {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: #333;
    border: 1px solid var(--color-blue);
    color: var(--color-white);
    border-radius: 4px;
    font-size: var(--font-medium);
  }

  .input-field:focus {
    outline: none;
    border-color: var(--color-blue);
    box-shadow: 0 0 4px var(--color-blue);
  }

  .input-field:disabled {
    background-color: #222;
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>
