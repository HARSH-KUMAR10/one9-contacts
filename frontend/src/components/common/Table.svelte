<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";

  export let items = [];
  export let columns = [];
  export let onRowClick = () => {};

  let containerWidth = 0;
</script>

<div class="table-container" bind:clientWidth={containerWidth}>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          {#each columns as column (column.key)}
            <th class="medium">{column.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each items as item (item._id || item.id)}
          <tr class="data-row" on:click={() => onRowClick(item)}>
            {#each columns as column (column.key)}
              <td class="medium">
                {item[column.key] || "-"}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .table-container {
    width: 100%;
    border: 1px solid var(--color-blue);
    border-radius: 4px;
    overflow: hidden;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #333;
  }

  thead {
    background-color: #222;
    border-bottom: 2px solid var(--color-blue);
  }

  th {
    padding: var(--spacing-md);
    text-align: left;
    color: var(--color-blue);
    font-weight: bold;
  }

  .data-row {
    border-bottom: 1px solid #444;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .data-row:hover {
    background-color: #444;
  }

  td {
    padding: var(--spacing-md);
    color: var(--color-white);
  }

  @media (max-width: 600px) {
    .data-table {
      font-size: var(--font-small);
    }

    th,
    td {
      padding: var(--spacing-sm);
    }
  }
</style>
