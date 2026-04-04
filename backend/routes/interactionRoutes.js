const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { deleteInteraction } = require('../controllers/interactionController');

// All routes require authentication
router.use(protect);

router.route('/:id')
  .delete(deleteInteraction);

module.exports = router;
