<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "../common/Modal.svelte";
  import Button from "../common/Button.svelte";
  import Alert from "../common/Alert.svelte";

  export let show = false;
  export let contacts = [];
  export let isImporting = false;
  export let error = null;

  const dispatch = createEventDispatcher();

  // Keep track of which contacts are selected for import
  let selectedIndices = new Set();

  // Reset selection when modal opens or contacts change
  $: if (show && contacts) {
    selectedIndices = new Set(contacts.map((_, i) => i));
  }

  function handleClose() {
    dispatch("close");
  }

  function handleImport() {
    const selectedContacts = contacts.filter((_, i) => selectedIndices.has(i));
    
    // Transform to expected backend format
    const formattedContacts = selectedContacts.map(c => {
      return {
        name: c.name?.[0] || 'Unknown',
        email: c.email?.[0] || '',
        phone: c.tel?.[0] || '',
        notes: "Imported from device"
      };
    });

    dispatch("import", formattedContacts);
  }

  function toggleSelection(index) {
    if (selectedIndices.has(index)) {
      selectedIndices.delete(index);
    } else {
      selectedIndices.add(index);
    }
    selectedIndices = selectedIndices; // trigger reactivity
  }
</script>

<Modal {show} title="Review Imported Contacts" onClose={handleClose}>
  {#if error}
    <Alert message={error} type="error" />
  {/if}

  {#if contacts.length === 0}
    <p>No contacts found.</p>
  {:else}
    <p class="summary small">Select the contacts you want to add to your account.</p>
    
    <div class="contacts-list">
      {#each contacts as contact, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="contact-item" on:click={() => toggleSelection(index)}>
          <input 
            type="checkbox" 
            checked={selectedIndices.has(index)} 
            on:change={() => toggleSelection(index)}
            on:click|stopPropagation 
          />
          <div class="contact-details">
            <strong>{contact.name?.[0] || 'Unknown Name'}</strong>
            {#if contact.email && contact.email.length}
              <div class="small info">{contact.email[0]}</div>
            {/if}
            {#if contact.tel && contact.tel.length}
              <div class="small info">{contact.tel[0]}</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <div class="actions">
    <Button
      text="Cancel"
      onClick={handleClose}
      className="btn-secondary"
      disabled={isImporting}
    />
    <Button
      text={isImporting ? "Importing..." : `Import Selected (${selectedIndices.size})`}
      onClick={handleImport}
      className="btn-primary"
      disabled={isImporting || selectedIndices.size === 0}
    />
  </div>
</Modal>

<style>
  .contacts-list {
    max-height: 50vh;
    overflow-y: auto;
    border: 1px solid #444;
    border-radius: 4px;
    margin-bottom: var(--spacing-md);
    background-color: var(--color-black);
  }

  .contact-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid #333;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .contact-item:hover {
    background-color: #222;
  }

  .contact-item:last-child {
    border-bottom: none;
  }

  .contact-details {
    margin-left: var(--spacing-md);
    display: flex;
    flex-direction: column;
  }

  .info {
    color: #aaa;
  }

  .summary {
    color: #ccc;
    margin-bottom: var(--spacing-md);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }

  :global(.btn-secondary) {
    background-color: transparent !important;
    border: 1px solid var(--color-white) !important;
    color: var(--color-white) !important;
  }
</style>
