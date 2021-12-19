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
        }
        res.status(403).send('not ok')
    } catch (err) {
        res.status(403).json({
            status: 403,
            error: `Vous n'avez pas les droits nécessaires`,
        })
    }
}

module.exports = userConnected;
