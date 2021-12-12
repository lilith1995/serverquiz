const express = require("express");
const router = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;

const User = require("../../models/User");

const loginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

router.post("/", validate(loginValidation, {}, {}), async (req, res) => {
  res.json(200);
    if (!loginValidation) {
        return res.status(err.statusCode).json();
  }

    const { username, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ err: [{ msg: 'User already exists' }] })
        }

        user = new User({
            username,
            email,
            password
        })

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
            res.json({ token });
        });
    }catch (err) {
        console.log(err.message)
        res.status(500).send("Server error");
    }
});


module.exports = router;
