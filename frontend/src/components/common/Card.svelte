<script>
  export let title = "";
  export let children = "";
</script>

<div class="card">
  {#if title}
    <h3 class="card-title big">{title}</h3>
  {/if}
  <div class="card-content">
    <slot />
  </div>
</div>

<style>
  .card {
    background-color: #333;
    border: 1px solid var(--color-blue);
    border-radius: 4px;
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .card-title {
    margin-bottom: var(--spacing-md);
    color: var(--color-blue);
  }

  .card-content {
    color: var(--color-white);
  }
</style>
