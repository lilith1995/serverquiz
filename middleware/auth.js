const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;

module.exports = function (req, res, next) {
    //Get token
    const token = req.header('x-auth-token')
    //Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, JWTSECRET)

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}