<script>
  import { onMount } from "svelte";
  import { contacts, loading, error, success } from "./stores/contacts.js";
  import { auth, setAuth, clearAuth } from "./stores/auth.js";
  import { apiClient } from "./utils/api.js";
  import Header from "./components/pages/Header.svelte";
  import ContactList from "./components/pages/ContactList.svelte";
  import ContactForm from "./components/pages/ContactForm.svelte";
  import ImportContactsModal from "./components/pages/ImportContactsModal.svelte";
  import LoginPage from "./components/pages/LoginPage.svelte";
  import "./styles/globals.css";
  import "./styles/typography.css";

  let showForm = false;
  let showImportModal = false;
  let importedContacts = [];
  let importError = null;
  let isImporting = false;
  let editingContact = null;
  let isAuthenticated = false;

  onMount(async () => {
    // Check if user is already authenticated
    const token = localStorage.getItem("auth_token");
    const email = localStorage.getItem("auth_email");

    if (token && email) {
      isAuthenticated = true;
      auth.set({
        isAuthenticated: true,
        user: null,
        token,
        email,
      });
      fetchContacts();
    }
  });

  async function fetchContacts() {
    loading.set(true);
    try {
      const result = await apiClient.get("/contacts");
      contacts.set(result.data || []);
      error.set(null);
    } catch (err) {
      error.set("Failed to load contacts");
    }
    loading.set(false);
  }

  function handleLoginSuccess(data) {
    setAuth(data.token, data.user, data.email);
    isAuthenticated = true;
    fetchContacts();
  }

  function handleLogout() {
    const email = $auth.email;
    apiClient.post("/auth/logout", { email }).catch(() => {});
    clearAuth();
    isAuthenticated = false;
    showForm = false;
  }

  function handleAddClick() {
    editingContact = null;
    showForm = true;
  }

  async function handleImportClick() {
    if (!("contacts" in navigator && "ContactsManager" in window)) {
      alert("Your browser or device does not support reading phone contacts directly.");
      return;
    }
    
    try {
      const props = ["name", "email", "tel"];
      const options = { multiple: true };
      const rawContacts = await navigator.contacts.select(props, options);
      
      if (rawContacts && rawContacts.length > 0) {
        importedContacts = rawContacts;
        showImportModal = true;
        importError = null;
      }
    } catch (err) {
      console.error("Failed to read contacts", err);
    }
  }

  async function handleImportSubmit(event) {
    const formattedContacts = event.detail;
    isImporting = true;
    importError = null;

    try {
      const result = await apiClient.post("/contacts/bulk", { contacts: formattedContacts });
      
      if (result.success || Array.isArray(result.data)) {
        success.set(`Successfully imported contacts.`);
        showImportModal = false;
        fetchContacts();
      } else {
        importError = result.message || "Failed to import contacts.";
      }
    } catch (err) {
      importError = "An error occurred while importing contacts.";
    }
    
    isImporting = false;
  }

  function handleEditContact(contact) {
    editingContact = contact;
    showForm = true;
  }

  function handleDeleteContact(contactId) {
    if (confirm("Are you sure you want to delete this contact?")) {
      apiClient
        .delete(`/contacts/${contactId}`)
        .then(() => {
          fetchContacts();
          success.set("Contact deleted successfully");
        })
        .catch(() => {
          error.set("Failed to delete contact");
        });
    }
  }

  function handleFormClose() {
    showForm = false;
    editingContact = null;
    fetchContacts();
  }

  function handleFormSubmit() {
    showForm = false;
    editingContact = null;
    fetchContacts();
  }
</script>

{#if isAuthenticated}
  <div class="app">
    <Header onLogout={handleLogout} onAddClick={handleAddClick} onImportClick={handleImportClick} />

    <main class="main-content">
      <ContactForm
        bind:show={showForm}
        contact={editingContact}
        on:close={handleFormClose}
        on:submit={handleFormSubmit}
      />

      <ImportContactsModal
        show={showImportModal}
        contacts={importedContacts}
        error={importError}
        isImporting={isImporting}
        on:close={() => showImportModal = false}
        on:import={handleImportSubmit}
      />

      <ContactList
        on:edit-contact={({ detail }) => handleEditContact(detail)}
        on:delete-contact={({ detail }) => handleDeleteContact(detail)}
      />
    </main>
  </div>
{:else}
  <LoginPage onSuccess={handleLoginSuccess} />
{/if}

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-black);
  }

  .main-content {
    flex: 1;
    padding: var(--spacing-md);
    max-width: 100%;
  }

  @media (min-width: 768px) {
    .main-content {
      padding: var(--spacing-lg);
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
