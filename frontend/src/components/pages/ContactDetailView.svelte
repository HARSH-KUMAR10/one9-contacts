<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { apiClient } from '../../utils/api.js';
  import Card from '../common/Card.svelte';
  import Button from '../common/Button.svelte';
  import Alert from '../common/Alert.svelte';

  export let contactId;
  
  const dispatch = createEventDispatcher();

  let contact = null;
  let interactions = [];
  let loading = true;
  let errorMsg = null;

  export function fetchDetails() { 
      loadData();
  }

  async function loadData() {
    loading = true;
    errorMsg = null;
    try {
      // Execute fetches dynamically natively through Svelte's fetch wrappers
      const [contactRes, interactionsRes] = await Promise.all([
        apiClient.get(`/contacts/${contactId}`),
        apiClient.get(`/contacts/${contactId}/interactions`)
      ]);
      contact = contactRes.data;
      interactions = interactionsRes.data;
    } catch (err) {
      errorMsg = 'Failed to load contact details or interactions.';
    }
    loading = false;
  }

  onMount(() => {
    loadData();
  });

  const handleBack = () => {
    dispatch('back');
  };

  const handleEdit = () => {
    dispatch('edit-contact', contact);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await apiClient.delete(`/contacts/${contactId}`);
        dispatch('contact-deleted');
      } catch (err) {
        errorMsg = 'Failed to delete contact. Ensure all interactions are wiped prior.';
      }
    }
  };

</script>

<div class="view-container">
  {#if errorMsg}
    <Alert message={errorMsg} type="error" />
  {/if}

  {#if loading}
    <Card title="Loading Contact...">
      <p class="medium">Fetching details and interaction history...</p>
    </Card>
  {:else if contact}
    <div class="header-actions">
      <Button text="← Back to List" onClick={handleBack} className="btn-secondary" />
      <div class="actions-right">
        <Button text="Edit Contact" onClick={handleEdit} className="btn-secondary" />
        <Button text="Delete" onClick={handleDelete} className="btn-danger" />
      </div>
    </div>

    <!-- Contact Info Map -->
    <Card title={contact.name}>
      <div class="contact-details">
        {#if contact.email}<p><strong>Email:</strong> {contact.email}</p>{/if}
        {#if contact.phone}<p><strong>Phone:</strong> {contact.phone}</p>{/if}
        {#if contact.company}<p><strong>Company:</strong> {contact.company}</p>{/if}
        {#if contact.notes}
          <div class="notes-section">
            <strong>Notes:</strong>
            <p>{contact.notes}</p>
          </div>
        {/if}
      </div>
    </Card>

    <!-- Interactions Segment -->
    <div class="interactions-header">
      <h2>Interactions</h2>
      <Button text="Add Log" onClick={() => dispatch('add-interaction', contact)} />
    </div>

    {#if interactions.length === 0}
      <Card>
        <p class="medium" style="text-align: center; color: #aaa;">No interactions logged yet.</p>
      </Card>
    {:else}
      <div class="timeline">
        {#each interactions as interaction}
          <Card>
            <div class="interaction-header">
              <span class="type-badge">{interaction.interactionType}</span>
              <span class="date">{new Date(interaction.date || interaction.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {#if interaction.label}
              <span class="label-badge">{interaction.label}</span>
            {/if}
            <p class="interaction-summary">{interaction.summary}</p>
          </Card>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .view-container {
    max-width: 800px;
    margin: 0 auto;
  }
  .header-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  .actions-right {
    display: flex;
    gap: var(--spacing-md);
  }
  .contact-details p {
    margin-bottom: var(--spacing-sm);
    color: var(--color-white);
    font-size: var(--font-medium);
  }
  .notes-section {
    margin-top: var(--spacing-md);
    background: #1a1a1a;
    padding: var(--spacing-md);
    border-radius: 4px;
    border: 1px solid #333;
    font-size: var(--font-medium);
  }
  .interactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }
  .interactions-header h2 {
    font-family: Arial, sans-serif;
    color: var(--color-white);
    margin: 0;
  }
  .timeline {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .interaction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-small);
  }
  .date {
    color: #888;
  }
  .type-badge {
    background: #333;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: bold;
  }
  .label-badge {
    color: var(--color-blue);
    border: 1px solid var(--color-blue);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: var(--font-small);
    display: inline-block;
    margin-bottom: var(--spacing-sm);
  }
  .interaction-summary {
    white-space: pre-wrap;
    line-height: 1.5;
    color: var(--color-white);
    margin-top: var(--spacing-xs);
  }
  
  :global(.btn-secondary) {
    background-color: transparent !important;
    border: 1px solid var(--color-white) !important;
    color: white !important;
  }
  :global(.btn-danger) {
    background-color: #8b0000 !important;
    color: white !important;
    border: none;
  }
</style>
