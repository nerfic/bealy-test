const RoomJoin = require('../models/roomsJoin')

async function userGetRightRoom(req, res, next) {
    try {
        const userId = req.userConnected.id
        const roomUuid = req.params.uuid
        const userRight = await RoomJoin.findAll({
            where: {
                user_id: userId,
                room_uuid: roomUuid
            }
        })
        if (userRight.length > 0) {
            return next()
        } else {
            res.status(403).json({
                status: 403,
                error: "You don't have permission"
            })
            return;
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports = userGetRightRoom;
