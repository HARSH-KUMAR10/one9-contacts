const contactService = require('../services/contactService');

// @desc    Create new contact
// @route   POST /contacts
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, company, notes } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Name is required');
    }

    const contactData = {
      ownerId: req.user.id,
      name,
      email,
      phone,
      company,
      notes
    };

    const contact = await contactService.createContact(contactData);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user's contacts
// @route   GET /contacts
const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getContactsByOwner(req.user.id);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /contacts/:id
const getContact = async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.id, req.user.id);
    
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact
// @route   PUT /contacts/:id
const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone, company, notes } = req.body;

    const contact = await contactService.getContactById(req.params.id, req.user.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;
    if (notes !== undefined) updateData.notes = notes;

    const updatedContact = await contactService.updateContact(req.params.id, req.user.id, updateData);
    
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /contacts/:id
const deleteContact = async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.id, req.user.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    await contactService.deleteContact(req.params.id, req.user.id);
    
    res.status(200).json({ id: req.params.id, message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
};
