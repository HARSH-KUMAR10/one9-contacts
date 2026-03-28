import express from "express";
import { contactController } from "../controllers/ContactController.js";

const router = express.Router();

router.get("/", (req, res) => contactController.getAll(req, res));
router.get("/search", (req, res) => contactController.search(req, res));
router.get("/:id", (req, res) => contactController.getById(req, res));
router.post("/bulk", (req, res) => contactController.bulkCreate(req, res));
router.post("/", (req, res) => contactController.create(req, res));
router.put("/:id", (req, res) => contactController.update(req, res));
router.delete("/:id", (req, res) => contactController.delete(req, res));

export default router;
