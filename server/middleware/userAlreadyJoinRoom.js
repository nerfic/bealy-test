const Room = require('../models/rooms')
const RoomJoin = require('../models/roomsJoin')

async function userAlreadyJoinRoom(req, res, next) {
    try {
        const userId = req.userConnected.id
        const roomUuid = req.room.uuid
        const userJoinedRoom = await RoomJoin.findAll({
            where: {
                user_id: userId,
                room_uuid: roomUuid
            }
        })
        if (userJoinedRoom.length === 0) {
            return next()
        } else {
            res.status(403).json({
                status: 403,
                error: "You have already join this room"
            })
            return;
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports = userAlreadyJoinRoom;
