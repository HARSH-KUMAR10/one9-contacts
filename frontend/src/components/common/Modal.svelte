<script>
  export let show = false;
  export let title = "";
  export let onClose = () => {};
</script>

{#if show}
  <div class="modal-overlay" on:click={onClose}>
    <div class="modal-content" on:click|stopPropagation>
      {#if title}
        <div class="modal-header">
          <h2 class="big">{title}</h2>
          <button class="close-btn" on:click={onClose}>×</button>
        </div>
      {/if}
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #333;
    border: 2px solid var(--color-blue);
    border-radius: 8px;
    padding: var(--spacing-lg);
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-blue);
  }

  .modal-header h2 {
    color: var(--color-blue);
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--color-white);
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
  }

  .close-btn:hover {
    color: var(--color-blue);
  }

  .modal-body {
    color: var(--color-white);
  }

  @media (max-width: 600px) {
    .modal-content {
      max-width: 95%;
      padding: var(--spacing-md);
    }
  }
</style>
