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
        res.status(404).send('User not exist')
    }
}

module.exports = findUserByEmail;
