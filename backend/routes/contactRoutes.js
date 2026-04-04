const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const {
  createInteraction,
  getContactInteractions
} = require('../controllers/interactionController');

// All interactions with contacts require authentication
router.use(protect);

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

router.route('/:id/interactions')
  .get(getContactInteractions)
  .post(createInteraction);

module.exports = router;
