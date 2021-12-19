const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../models/users');
const findUserByEmail = require('../middleware/findUserByEmail')

router.post('/signup', findUserByEmail, async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            res.status(409).json({
                status: 409,
                error: "Email already use"
            })
            return;
        } else {
            if (req.body.password.length >= 4) {
                await User.create({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password)
                })
                res.status(200).json({
                    status: 200,
                    success: "User create"
                })
                return;
            } else {
                res.status(400).json({
                    status: 400,
                    error: "Password too short"
                })
                return;
            }
        }
    } catch (err) {
        res.send(err)
    }
})

router.post('/login', findUserByEmail, async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, process.env.JWT_SECRET, {
                    expiresIn: parseInt(process.env.JWT_EXPIRE)
                })
                res.status(200).json({
                    status: 200,
                    success: "User connected",
                    token: token
                })
                return;
            } else {
                res.status(403).json({
                    status: 403,
                    error: "Email or password not ok"
                })
                return;
            }
        } else {
            res.status(404).json({
                status: 404,
                error: "User not exist"
            })
            return;
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
