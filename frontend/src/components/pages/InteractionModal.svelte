<script>
  import { createEventDispatcher } from 'svelte';
  import { apiClient } from '../../utils/api.js';
  import Card from '../common/Card.svelte';
  import Button from '../common/Button.svelte';
  import Input from '../common/Input.svelte';
  import Alert from '../common/Alert.svelte';

  export let show = false;
  export let contact = null;

  const dispatch = createEventDispatcher();

  let interactionType = 'Meeting';
  let summary = '';
  let label = '';
  let errorMsg = null;
  let loading = false;

  const TYPES = ['Meeting', 'Email', 'Call', 'Other'];

  const closeModal = () => {
    show = false;
    errorMsg = null;
    summary = '';
    label = '';
    interactionType = 'Meeting';
    dispatch('close');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!summary.trim() || !contact) {
      errorMsg = 'Summary text is required';
      return;
    }

    loading = true;
    errorMsg = null;

    try {
      const payload = {
        interactionType,
        summary,
        label
      };
      // contact is now the unwrapped data object from App.svelte/ContactDetailView.svelte
      await apiClient.post(`/contacts/${contact._id}/interactions`, payload);
      dispatch('submit');
      closeModal();
    } catch (err) {
      errorMsg = err.message || 'Failed to save interaction';
      loading = false;
    }
  };
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events // handled purely via overlay interaction -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <Card title={`Add Log for ${contact?.name || ''}`}>
        {#if errorMsg}
          <Alert message={errorMsg} type="error" />
        {/if}

        <form on:submit={handleSubmit}>
          <div class="form-group">
            <label for="type">Type</label>
            <select id="type" bind:value={interactionType} class="custom-select">
              {#each TYPES as t}
                <option value={t}>{t}</option>
              {/each}
            </select>
          </div>

          <Input
            label="Label (e.g. Follow-up, Important)"
            name="label"
            type="text"
            bind:value={label}
            placeholder="Optional tag (e.g. Follow-up)"
          />

          <div class="form-group" style="margin-top: 1rem;">
            <label for="summary">Summary / Notes <span style="color: red">*</span></label>
            <textarea
              id="summary"
              bind:value={summary}
              required
              rows="4"
              placeholder="What was discussed?"
              class="custom-textarea"
            ></textarea>
          </div>

          <div class="modal-actions">
            <Button
              text="Cancel"
              type="button"
              onClick={closeModal}
              className="btn-cancel"
            />
            <Button
              text={loading ? "Saving..." : "Save Interaction"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </Card>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    width: 100%;
    max-width: 500px;
    padding: var(--spacing-sm);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-md);
  }

  .form-group label {
    font-family: Arial, sans-serif;
    font-size: var(--font-small);
    color: var(--color-white);
    margin-bottom: var(--spacing-xs);
  }

  .custom-select, .custom-textarea {
    background-color: var(--color-black);
    border: 1px solid #333;
    color: var(--color-white);
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: Arial, sans-serif;
    outline: none;
    transition: border-color 0.2s;
    border-radius: 4px;
  }

  .custom-select:focus, .custom-textarea:focus {
    border-color: var(--color-blue);
  }
  
  .custom-textarea {
    resize: vertical;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }

  :global(.btn-cancel) {
    background-color: transparent !important;
    border: 1px solid #555 !important;
    color: white !important;
  }
</style>
