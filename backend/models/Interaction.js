const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  interactionType: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  label: { 
    type: String,
  },
  date: { 
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);
