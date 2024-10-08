const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add a new member
router.post('/', async (req, res) => {
    const { name, email, membershipType, startDate, endDate } = req.body;

    try {
        let member = new Member({
            name,
            email,
            membershipType,
            startDate,
            endDate,
            active: true
        });

        await member.save();
        res.json(member);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add your member routes here

module.exports = router;
