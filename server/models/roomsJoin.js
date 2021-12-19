const sequelize = require('../services/sequelize');
const { Sequelize } = require('sequelize')

const RoomJoin = sequelize.define('rooms_join', {
    room_uuid: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
}, {
    tableName: 'rooms_join'
})

module.exports = RoomJoin
