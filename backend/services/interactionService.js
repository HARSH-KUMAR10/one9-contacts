const Interaction = require('../models/Interaction');

const interactionService = {
  createInteraction: async (interactionData) => {
    const interaction = new Interaction(interactionData);
    return await interaction.save();
  },

  getInteractionsForContact: async (contactId, ownerId) => {
    return await Interaction.find({ contactId, ownerId }).sort({ date: -1 });
  },

  getInteractionById: async (id, ownerId) => {
    return await Interaction.findOne({ _id: id, ownerId });
  },

  deleteInteraction: async (id, ownerId) => {
    return await Interaction.findOneAndDelete({ _id: id, ownerId });
  }
};

module.exports = interactionService;
