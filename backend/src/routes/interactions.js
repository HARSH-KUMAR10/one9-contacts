import express from "express";
import { interactionController } from "../controllers/InteractionController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Delete a standalone interaction by its own ID. 
// Uses authMiddleware natively passed through the main server.js entrypoint
router.delete("/:id", (req, res) => interactionController.delete(req, res));

export default router;
