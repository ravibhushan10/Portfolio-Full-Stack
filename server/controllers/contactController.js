const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);

        if (!req.body.fullName || !req.body.email || !req.body.subject || !req.body.message) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled: fullName, email, subject, message'
            });
        }

        const contact = new Contact({
            fullName: req.body.fullName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: req.body.phone ? req.body.phone.trim() : '',
            subject: req.body.subject.trim(),
            message: req.body.message.trim()
        });

        const savedContact = await contact.save();
        console.log('Contact saved to MongoDB:', savedContact._id);

        return res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: {
                id: savedContact._id,
                timestamp: savedContact.createdAt
            }
        });

    } catch (error) {
        console.error('Error saving contact:', error);
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'This email has already submitted a message'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
};
