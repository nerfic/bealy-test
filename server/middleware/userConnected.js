const jwt = require("jsonwebtoken")
const User = require("../models/users")

async function userConnected(req, res, next) {
    try {
        const token = req.headers.authorization;
        const result = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        const user = await User.findOne({
            where: { id: result.id }
        });
        if (result) {
            req.userConnected = user
            return next();
        } else {
            res.status(403).json({
                status: 403,
                error: "You are not logged in"
            })
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports = userConnected;
