const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Address = require('../models/address.model');

// POST route to create a user and associated addres
router.post('/register', async (req, res) => {
    const { name, street, city, state, postalCode } = req.body;

    try {
        // Check if the user with the same name exists
        let user = await User.findOne({ name });

        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({ name });
            await user.save();
        }

        // Check if the address already exists for the user
        const existingAddress = await Address.findOne({
            street,
            city,
            state,
            postalCode,
            userId: user._id,
        });

        if (existingAddress) {
            return res.status(400).json({ message: 'This address is already stored for this user.' });
        }

        // If no duplicate address, save the new address
        const address = new Address({
            street,
            city,
            state,
            postalCode,
            userId: user._id,
        });
        await address.save();

        res.status(201).json({ message: 'User and Address created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
