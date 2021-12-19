const sequelize = require('../services/sequelize');
const { Sequelize } = require('sequelize')

const User = sequelize.define('users', {
    email: Sequelize.STRING,
    password: Sequelize.TEXT,
})

module.exports = User
