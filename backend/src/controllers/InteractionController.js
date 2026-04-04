import { interactionService } from "../services/InteractionService.js";
import { logger } from "../logger/index.js";
import { sendResponse, sendError } from "../helpers/response.js";

export class InteractionController {
  
  async getByContact(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId; // injected via authMiddleware

      if (!id) {
        return sendError(res, 400, "Contact ID is required");
      }

      const interactions = await interactionService.getByContact(id, userId);
      sendResponse(res, 200, "Interactions retrieved successfully", interactions);
    } catch (error) {
      logger.error("Error fetching interactions", { error: error.message });
      sendError(res, 500, "Failed to fetch interactions");
    }
  }

  async create(req, res) {
    try {
      const { id } = req.params; // contact ID
      const userId = req.userId;
      const { interactionType, summary, label } = req.body;

      if (!id) {
        return sendError(res, 400, "Contact ID is required");
      }

      if (!summary) {
        return sendError(res, 400, "Summary is required");
      }

      const contactExists = await interactionService.checkContactExists(id);
      if (!contactExists) {
        return sendError(res, 404, "Target contact not found");
      }

      const interaction = await interactionService.createInteraction({
        contact: id,
        user: userId,
        interactionType: interactionType || 'Meeting',
        summary,
        label
      });

      sendResponse(res, 201, "Interaction logged successfully", interaction);
    } catch (error) {
      logger.error("Error creating interaction", { error: error.message });
      sendError(res, 500, "Failed to log interaction");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!id) {
        return sendError(res, 400, "Interaction ID is required");
      }

      const interaction = await interactionService.deleteInteraction(id, userId);

      if (!interaction) {
        return sendError(res, 404, "Interaction not found or unauthorized");
      }

      sendResponse(res, 200, "Interaction deleted successfully", { id });
    } catch (error) {
      logger.error("Error deleting interaction", { error: error.message });
      sendError(res, 500, "Failed to delete interaction");
    }
  }
}

export const interactionController = new InteractionController();
