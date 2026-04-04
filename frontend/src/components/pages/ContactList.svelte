<script>
  import { contacts, loading, error } from "../../stores/contacts.js";
  import Card from "../common/Card.svelte";
  import Table from "../common/Table.svelte";
  import Alert from "../common/Alert.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "notes", label: "Notes" },
  ];

  let searchQuery = "";

  $: filteredContacts = $contacts.filter(c => {
    if (!searchQuery) return true;
    const lowerQ = searchQuery.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(lowerQ)) ||
      (c.email && c.email.toLowerCase().includes(lowerQ)) ||
      (c.company && c.company.toLowerCase().includes(lowerQ))
    );
  });

  const handleRowClick = (contact) => {
    dispatch("view-contact", contact);
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
    <div class="search-container">
      <input 
        type="text" 
        bind:value={searchQuery} 
        placeholder="Search contacts by name, email, or company..." 
        class="search-input"
      />
    </div>
    
    {#if filteredContacts.length === 0}
      <Card>
        <p class="medium" style="text-align: center; color: #888;">No contacts found matching "{searchQuery}"</p>
      </Card>
    {:else}
      <Table items={filteredContacts} {columns} onRowClick={handleRowClick} />
    {/if}
  {/if}
</div>

<style>
  .contact-list {
    width: 100%;
  }
  
  .search-container {
    margin-bottom: var(--spacing-md);
  }
  
  .search-input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--color-black);
    color: var(--color-white);
    border: 1px solid #333;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .search-input:focus {
    border-color: var(--color-blue);
  }
</style>
