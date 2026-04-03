import { Contact } from "../models/Contact.js";

export class ContactService {
  async getAllContacts() {
    return await Contact.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async getContactById(id) {
    return await Contact.findById(id);
  }

  async createContact(data) {
    const contact = new Contact(data);
    return await contact.save();
  }

  async bulkCreateContacts(contactsData) {
    if (!contactsData || !contactsData.length) return [];
    
    // Process records
    const processedContacts = contactsData.map((data) => {
      const contact = {
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Prevent duplicate key errors on empty emails if the DB has a unique index
      if (!contact.email) {
        delete contact.email;
      }
      return contact;
    });

    // Perform bulk insertion
    return await Contact.insertMany(processedContacts, { ordered: false });
  }

  async updateContact(id, data) {
    return await Contact.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true },
    );
  }

  async deleteContact(id) {
    return await Contact.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true },
    );
  }

  async searchContacts(query) {
    return await Contact.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
  }
}

export const contactService = new ContactService();
