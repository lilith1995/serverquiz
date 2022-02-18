const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticateJWT = require('../../middleware/auth');

const passport = require('passport');

require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;
// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load User model
const User = require('../../models/User');

// GET api/users/test
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// GET api/users/register
router.post('/register', async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { name, email, password } = req.body;


    try {
        let user = await User.findOne({ email });

        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default
        });

        user = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password,
            isAdmin: false
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, JWTSECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })
    } catch (err) {
        console.error(err.message);
        return res.status(400).json(errors);
    }
});


// router.get('/usersList', function (req, res) {
//     User.find({}, function (err, users) {
//         var userMap = {};

//         users.forEach(function (user) {
//             userMap[user.id] = user;
//         });

//         res.send(userMap);
//     });
// });

// GET api/users/current
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        });
    }
);

module.exports = router;