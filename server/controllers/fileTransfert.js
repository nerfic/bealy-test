const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const FileUpload = require("../models/fileUpload")
const userConnected = require("../middleware/userConnected")
const userGetRightRoom = require("../middleware/userGetRightRoom")
const findRoomByUuid = require("../middleware/findRoomByUuid")

const upload = multer({ dest: 'public/uploads' });

router.post("/:uuid", userConnected, userGetRightRoom, upload.single('file'), async (req, res) => {
    try {
        let fileName = req.file.originalname.split(".")
        let extension = fileName[fileName.length - 1]
        fs.renameSync(req.file.path, path.join(req.file.destination, `${req.file.filename}.${extension}`));
        await FileUpload.create({
            room_id: req.params.uuid,
            user_id: 1,
            original_name: req.file.originalname,
            path: `${req.file.filename}.${extension}`
        })
        res.status(200).json({
            status: 200,
            name: req.file.originalname,
            path: `${req.file.filename}.${extension}`
        })
    } catch (err) {
        console.log(err)
    }
})

router.get("/:uuid", userConnected, userGetRightRoom, async (req, res) => {
    try {
        const allFiles = await FileUpload.findAll({
            where: {
                room_id: req.params.uuid
            }
        })
        res.status(200).json({
            status: 200,
            success: allFiles
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
