const sequelize = require('../services/sequelize');
const { Sequelize } = require('sequelize')

const Room = sequelize.define('rooms', {
    uuid: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
})

module.exports = Room
