const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Create a unique index to prevent the same address for the same user being stored twice
AddressSchema.index({ street: 1, city: 1, state: 1, postalCode: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Address', AddressSchema);
