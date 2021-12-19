const Room = require('../models/rooms')

async function findRoomByUuid(req, res, next) {
    try {
        const uuid = await Room.findOne({
            where: {
                uuid: req.body.room_uuid
            }
        })
        req.room = uuid
        next();
    }
    catch (err) {
        console.log(err)
        res.status(404).send('Room not exist')
    }
}

module.exports = findRoomByUuid;
