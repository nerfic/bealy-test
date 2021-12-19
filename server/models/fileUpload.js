const sequelize = require('../services/sequelize');
const { Sequelize } = require('sequelize')

const FileUpload = sequelize.define('file_upload', {
    room_id: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    path: Sequelize.STRING,
}, {
    tableName: 'file_upload'
})

module.exports = FileUpload
