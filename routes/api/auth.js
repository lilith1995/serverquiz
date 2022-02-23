const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const validateLoginInput = require('../../validation/login');

require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;

//Get api/auth

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        console.log(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

//Post 
// Auth get token
router.post('/', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;


    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: "Invalid credentials" });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                isAdmin: user.isAdmin
            }
        }

        jwt.sign(payload, JWTSECRET, { expiresIn: 300000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user })
        })
    } catch (err) {
        console.error(err.message);
        return res.status(400).json(errors);
    }
});


module.exports = router;