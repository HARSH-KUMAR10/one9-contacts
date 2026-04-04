const interactionService = require('../services/interactionService');
const contactService = require('../services/contactService'); 

// @desc    Create an interaction for a contact
// @route   POST /contacts/:id/interactions
const createInteraction = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const ownerId = req.user.id;
    const { interactionType, summary, label, date } = req.body;

    if (!interactionType || !summary) {
      res.status(400);
      throw new Error('Interaction type and summary are required');
    }

    // Validate contact exists and ownership
    const contact = await contactService.getContactById(contactId, ownerId);
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found or unauthorized');
    }

    const interactionData = {
      ownerId,
      contactId,
      interactionType,
      summary,
      label,
      date: date ? new Date(date) : undefined
    };

    const interaction = await interactionService.createInteraction(interactionData);
    res.status(201).json(interaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Get interactions for a contact
// @route   GET /contacts/:id/interactions
const getContactInteractions = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const ownerId = req.user.id;

    // Validate contact exists and ownership
    const contact = await contactService.getContactById(contactId, ownerId);
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found or unauthorized');
    }

    const interactions = await interactionService.getInteractionsForContact(contactId, ownerId);
    res.status(200).json(interactions);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete interaction
// @route   DELETE /interactions/:id
const deleteInteraction = async (req, res, next) => {
  try {
    const interactionId = req.params.id;
    const ownerId = req.user.id;

    // Validate interaction exists and ownership
    const interaction = await interactionService.getInteractionById(interactionId, ownerId);
    if (!interaction) {
      res.status(404);
      throw new Error('Interaction not found or unauthorized');
    }

    await interactionService.deleteInteraction(interactionId, ownerId);
    
    res.status(200).json({ id: interactionId, message: 'Interaction deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInteraction,
  getContactInteractions,
  deleteInteraction
};
