const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const sendEmail = require('../utils/sendEmail');
const { auth } = require('../middleware/auth');

// Subscribe and send payment details
router.post('/:id/subscribe', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        const { membershipType, startDate, endDate, paymentAmount } = req.body;

        // Validate required fields
        if (!membershipType || !startDate || !endDate || !paymentAmount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Parse dates
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        // Validate dates
        if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        member.membershipType = membershipType;
        member.startDate = parsedStartDate;
        member.endDate = parsedEndDate;
        member.active = true;

        // Calculate days remaining
        const currentDate = new Date();
        const timeDiff = member.endDate - currentDate;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        member.daysRemaining = daysRemaining;

        await member.save();

        const subject = `Subscription Confirmation: ${membershipType} Plan`;
        const text = `Dear ${member.name},\nYour payment of $${paymentAmount} for the ${membershipType} plan has been received. Your subscription is valid from ${member.startDate.toDateString()} to ${member.endDate.toDateString()}. You have ${daysRemaining} days remaining.\n\nBest regards,\nGym Management`;

        await sendEmail(member.email, subject, text);

        res.status(200).json({ message: 'Subscription successful', member });
    } catch (error) {
        console.error('Error processing subscription:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Check subscription status
router.get('/:id/subscription-status', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        const currentDate = new Date();
        const subscriptionStatus = member.endDate > currentDate ? 'Active' : 'Expired';

        res.status(200).json({ subscriptionStatus, member });
    } catch (err) {
        console.error('Error fetching subscription status:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Protect this route with auth middleware
router.get('/:id', auth, async (req, res) => {
    try {
        console.log(`Fetching subscription data for member ID: ${req.params.id}`);
        const member = await Member.findById(req.params.id);
        if (!member) {
            console.log(`Member not found for ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Member not found' });
        }

        const currentDate = new Date();
        const timeDiff = new Date(member.endDate) - currentDate;
        const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

        const subscriptionData = {
            membershipType: member.membershipType,
            startDate: member.startDate,
            endDate: member.endDate,
            daysRemaining: daysRemaining,
        };

        console.log('Subscription data:', subscriptionData);
        res.status(200).json(subscriptionData);
    } catch (error) {
        console.error('Error fetching subscription data:', error);
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message,
            stack: error.stack
        });
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;