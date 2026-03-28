<script>
  import { loading, error, success } from "../../stores/contacts.js";
  import { apiClient } from "../../utils/api.js";
  import Modal from "../common/Modal.svelte";
  import Input from "../common/Input.svelte";
  import Button from "../common/Button.svelte";
  import Alert from "../common/Alert.svelte";

  export let show = false;
  export let contact = null;

  let formData = { name: "", email: "", phone: "", notes: "" };
  let formError = null;

  $: if (contact) {
    formData = { ...contact };
  } else {
    formData = { name: "", email: "", phone: "", notes: "" };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    formError = null;

    if (!formData.name || !formData.email) {
      formError = "Name and email are required";
      return;
    }

    loading.set(true);
    try {
      if (contact && contact._id) {
        await apiClient.put(`/contacts/${contact._id}`, formData);
        success.set("Contact updated successfully");
      } else {
        await apiClient.post("/contacts", formData);
        success.set("Contact created successfully");
      }
      show = false;
      const event = new CustomEvent("submit");
      window.dispatchEvent(event);
    } catch (err) {
      formError = "Failed to save contact";
    }
    loading.set(false);
  };

  const handleClose = () => {
    show = false;
    formError = null;
    formData = { name: "", email: "", phone: "", notes: "" };
  };
</script>

<Modal
  {show}
  title={contact ? "Edit Contact" : "Add Contact"}
  onClose={handleClose}
>
  {#if formError}
    <Alert message={formError} type="error" />
  {/if}

  <form on:submit={handleSubmit}>
    <Input
      label="Name"
      type="text"
      name="name"
      bind:value={formData.name}
      required
      placeholder="Enter contact name"
    />

    <Input
      label="Email"
      type="email"
      name="email"
      bind:value={formData.email}
      required
      placeholder="Enter email address"
    />

    <Input
      label="Phone"
      type="tel"
      name="phone"
      bind:value={formData.phone}
      placeholder="Enter phone number"
    />

    <Input
      label="Notes"
      type="text"
      name="notes"
      bind:value={formData.notes}
      placeholder="Add any notes"
    />

    <div class="form-actions">
      <Button
        text={$loading ? "Saving..." : "Save"}
        type="submit"
        disabled={$loading}
      />
      <Button text="Cancel" onClick={handleClose} className="btn-secondary" />
    </div>
  </form>
</Modal>

<style>
  form {
    display: flex;
    flex-direction: column;
  }

  .form-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }

  .form-actions :global(.btn-secondary) {
    background-color: #333;
    border: 1px solid var(--color-white);
    color: var(--color-white);
  }

  .form-actions :global(.btn-secondary:hover) {
    background-color: #444;
  }

  @media (max-width: 600px) {
    .form-actions {
      flex-direction: column;
    }

    .form-actions :global(.btn) {
      width: 100%;
    }
  }
</style>
