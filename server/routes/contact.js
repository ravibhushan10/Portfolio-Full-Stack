const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController');


router.post('/', createContact);


router.get('/', async (req, res) => {
    try {
        const Contact = require('../models/contact');
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts'
        });
    }
});

module.exports = router;
