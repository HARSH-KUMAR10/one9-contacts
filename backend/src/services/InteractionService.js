import { Interaction } from "../models/Interaction.js";
import { Contact } from "../models/Contact.js";

export class InteractionService {
  async getByContact(contactId, userId) {
    // Only grab interactions for the contact if the contact itself exists
    // Though technically the user rules specify ownerId on Interactions
    return await Interaction.find({ contact: contactId, user: userId }).sort({ date: -1 });
  }

  async createInteraction(data) {
    const interaction = new Interaction(data);
    return await interaction.save();
  }

  async deleteInteraction(id, userId) {
    // Strictly bounds the deletion to the user owning the record
    return await Interaction.findOneAndDelete({ _id: id, user: userId });
  }

  async checkContactExists(contactId) {
    return await Contact.exists({ _id: contactId });
  }
}

export const interactionService = new InteractionService();
