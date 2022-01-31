const jwt = require('jsonwebtoken');
const User = require("../models/User")

require("dotenv").config();

const JWTSECRET = process.env.JWTSECRET;

module.exports = async function (req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            res.send({ message: "User not authorized" });
        }
        else {
            const decodedToken = jwt.verify(token, JWTSECRET);
            const tokenData = await User.findById(decodedToken.id)
            if (tokenData.isAdmin) {
                next();
            } else {
                res.send({ message: "User is not admin" });
            }
        }
    }
    catch (e) {
        console.log(e)
        res.send({ message: "User not authorized" });
    }
}