<script>
  export let message = "";
  export let type = "info";
</script>

<div class="alert alert-{type} medium">
  {message}
</div>

<style>
  .alert {
    padding: var(--spacing-md);
    border-radius: 4px;
    margin-bottom: var(--spacing-md);
    border-left: 4px solid;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .alert-info {
    background-color: rgba(41, 98, 255, 0.1);
    border-color: var(--color-blue);
    color: var(--color-white);
  }

  .alert-success {
    background-color: rgba(76, 175, 80, 0.1);
    border-color: #4caf50;
    color: #4caf50;
  }

  .alert-warning {
    background-color: rgba(255, 193, 7, 0.1);
    border-color: #ffc107;
    color: #ffc107;
  }

  .alert-error {
    background-color: rgba(244, 67, 54, 0.1);
    border-color: #f44336;
    color: #f44336;
  }
</style>
