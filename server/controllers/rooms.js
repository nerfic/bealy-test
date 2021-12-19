const express = require('express');
const router = express.Router();
const Room = require('../models/rooms')
const RoomJoin = require('../models/roomsJoin')
const { v4: uuidv4 } = require('uuid');
const userConnected = require('../middleware/userConnected')
const findRoomByUuid = require('../middleware/findRoomByUuid')

router.post('/join', userConnected, async (req, res) => { // securiser avec un check si room exist ou pas
    try {
        const userId = req.userConnected.id
        // const roomUuid = req.room

        await RoomJoin.create({
            room_uuid: req.body.room_uuid,
            user_id: userId
        })
        res.status(200).json({
            status: 200,
            success: req.body.room_uuid
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/create', userConnected, async (req, res) => {
    try {
        const userId = req.userConnected.id
        const uuid = uuidv4()

        await Room.create({
            uuid: uuid,
            user_id: userId
        })

        await RoomJoin.create({
            room_uuid: uuid,
            user_id: userId
        })

        res.status(200).json({
            status: 200,
            success: uuid
        })
    } catch (err) {
        res.send(err)
    }
})

router.get('/', userConnected, async (req, res) => {
    try {
        const userId = req.userConnected.id

        const myrooms = await RoomJoin.findAll({
            where: {
                user_id: userId
            }
        })
        res.send(myrooms)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;
