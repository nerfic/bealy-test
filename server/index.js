require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = require('express')();
const http = require('http').createServer(app)

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    }
})

const auth = require('./controllers/auth')
const rooms = require('./controllers/rooms')
const fileTransfert = require('./controllers/fileTransfert')

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

/* ROUTES */

app.use("/api/auth", auth)
app.use("/api/room", rooms)
app.use("/api/upload", fileTransfert)

/* SERVER */

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data.content);
    });

    // socket.on("disconnect", () => {
    //     console.log("USER DISCONNECTED");
    // });
});

http.listen(process.env.SERVER_PORT, () => {
    console.log("Server ON, port", process.env.SERVER_PORT)
})
