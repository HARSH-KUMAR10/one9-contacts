<script>
  import { auth } from "../../stores/auth.js";
  import Button from "../common/Button.svelte";

  export let onLogout = () => {};
  export let onAddClick = () => {};
  export let onImportClick = () => {};
</script>

<header class="header">
  <div class="header-content">
    <h1 class="app-title big">Contacts</h1>
    <div class="header-actions">
      <Button
        text="+ Add Contact"
        onClick={onAddClick}
        className="btn-primary"
      />
      <Button
        text="Import Phone Contacts"
        onClick={onImportClick}
        className="btn-secondary"
      />
      <button class="logout-btn small" on:click={onLogout} title="Logout">
        Logout
      </button>
    </div>
  </div>
</header>

<style>
  .header {
    background-color: #333;
    border-bottom: 2px solid var(--color-blue);
    padding: var(--spacing-md);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .app-title {
    color: var(--color-blue);
    margin: 0;
  }

  .header-actions {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
  }

  .btn-primary {
    background-color: var(--color-blue);
  }

  .logout-btn {
    background: none;
    border: 1px solid var(--color-white);
    color: var(--color-white);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 4px;
    cursor: pointer;
    font-family: Verdana, sans-serif;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    background-color: var(--color-blue);
    border-color: var(--color-blue);
    color: var(--color-white);
  }

  @media (max-width: 600px) {
    .header-content {
      flex-wrap: wrap;
      gap: var(--spacing-md);
    }

    .app-title {
      flex: 1 0 100%;
    }

    .header-actions {
      flex: 1 0 100%;
      flex-wrap: wrap;
    }

    .header-actions :global(.btn) {
      flex: 1;
      min-width: 100px;
    }

    .logout-btn {
      flex: 1;
      min-width: 80px;
    }
  }
</style>
