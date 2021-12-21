const User = require('../models/users')

async function findUserByEmail(req, res, next) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        req.user = user
        next();
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports = findUserByEmail;
