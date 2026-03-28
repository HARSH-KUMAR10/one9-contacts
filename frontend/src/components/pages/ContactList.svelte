<script>
  import { contacts, loading, error } from "../../stores/contacts.js";
  import Card from "../common/Card.svelte";
  import Table from "../common/Table.svelte";
  import Alert from "../common/Alert.svelte";

  export let onEditContact = () => {};
  export let onDeleteContact = () => {};

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "notes", label: "Notes" },
  ];

  const handleRowClick = (contact) => {
    onEditContact(contact);
  };
</script>

<div class="contact-list">
  {#if $error}
    <Alert message={$error} type="error" />
  {/if}

  {#if $loading}
    <Card title="Loading...">
      <p class="medium">Please wait while we fetch your contacts</p>
    </Card>
  {:else if $contacts.length === 0}
    <Card title="No Contacts">
      <p class="medium">Start by adding your first contact</p>
    </Card>
  {:else}
    <Table items={$contacts} {columns} onRowClick={handleRowClick} />
  {/if}
</div>

<style>
  .contact-list {
    width: 100%;
  }
</style>
