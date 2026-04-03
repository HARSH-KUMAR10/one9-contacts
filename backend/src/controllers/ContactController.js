import { contactService } from "../services/ContactService.js";
import { logger } from "../logger/index.js";
import { sendResponse, sendError } from "../helpers/response.js";

export class ContactController {
  async getAll(req, res) {
    try {
      const contacts = await contactService.getAllContacts();
      sendResponse(res, 200, "Contacts retrieved successfully", contacts);
    } catch (error) {
      logger.error("Error fetching contacts", { error: error.message });
      sendError(res, 500, "Failed to fetch contacts");
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const contact = await contactService.getContactById(id);

      if (!contact) {
        return sendError(res, 404, "Contact not found");
      }

      sendResponse(res, 200, "Contact retrieved successfully", contact);
    } catch (error) {
      logger.error("Error fetching contact", { error: error.message });
      sendError(res, 500, "Failed to fetch contact");
    }
  }

  async create(req, res) {
    try {
      const { name, email, phone, notes } = req.body;

      if (!name) {
        return sendError(res, 400, "Name is required");
      }

      const contact = await contactService.createContact({
        name,
        email,
        phone,
        notes,
      });

      sendResponse(res, 201, "Contact created successfully", contact);
    } catch (error) {
      logger.error("Error creating contact", { error: error.message });
      sendError(res, 500, "Failed to create contact");
    }
  }

  async bulkCreate(req, res) {
    try {
      const { contacts } = req.body;

      if (!Array.isArray(contacts) || contacts.length === 0) {
        return sendError(res, 400, "An array of contacts is required");
      }

      const createdContacts = await contactService.bulkCreateContacts(contacts);
      
      sendResponse(
        res,
        201,
        `${createdContacts.length} contacts imported successfully`,
        createdContacts
      );
    } catch (error) {
      logger.error("Error in bulk creating contacts", { error: error.message });
      // If error is due to partial ordered failure, we still return success with whatever got created
      if (error.code === 11000) { 
        return sendError(res, 400, "Some contacts could not be imported due to duplicate emails.");
      }
      sendError(res, 500, "Failed to import contacts in bulk");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, phone, notes } = req.body;

      const contact = await contactService.updateContact(id, {
        name,
        email,
        phone,
        notes,
      });

      if (!contact) {
        return sendError(res, 404, "Contact not found");
      }

      sendResponse(res, 200, "Contact updated successfully", contact);
    } catch (error) {
      logger.error("Error updating contact", { error: error.message });
      sendError(res, 500, "Failed to update contact");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const contact = await contactService.deleteContact(id);

      if (!contact) {
        return sendError(res, 404, "Contact not found");
      }

      sendResponse(res, 200, "Contact deleted successfully", { id });
    } catch (error) {
      logger.error("Error deleting contact", { error: error.message });
      sendError(res, 500, "Failed to delete contact");
    }
  }

  async search(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return sendError(res, 400, "Search query is required");
      }

      const contacts = await contactService.searchContacts(q);
      sendResponse(res, 200, "Search completed successfully", contacts);
    } catch (error) {
      logger.error("Error searching contacts", { error: error.message });
      sendError(res, 500, "Failed to search contacts");
    }
  }
}

export const contactController = new ContactController();
