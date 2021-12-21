const Room = require('../models/rooms')

async function findRoomByUuid(req, res, next) {
    const uuid = await Room.findOne({
        where: {
            uuid: req.body.room_uuid
        }
    })
    if (uuid) {
        req.room = uuid
        return next();
    } else {
        res.status(404).json({
            status: 404,
            message: "Room not exist"
        })
    }
}

module.exports = findRoomByUuid;
