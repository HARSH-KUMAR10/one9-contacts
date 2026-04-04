const Contact = require('../models/Contact');

const contactService = {
  createContact: async (contactData) => {
    const contact = new Contact(contactData);
    return await contact.save();
  },

  getContactsByOwner: async (ownerId) => {
    return await Contact.find({ ownerId }).sort({ createdAt: -1 });
  },

  getContactById: async (id, ownerId) => {
    return await Contact.findOne({ _id: id, ownerId });
  },

  updateContact: async (id, ownerId, updateData) => {
    return await Contact.findOneAndUpdate(
      { _id: id, ownerId },
      updateData,
      { new: true, runValidators: true }
    );
  },

  deleteContact: async (id, ownerId) => {
    return await Contact.findOneAndDelete({ _id: id, ownerId });
  }
};

module.exports = contactService;
