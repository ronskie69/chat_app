const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const { Server } = require('socket.io');
const io = new Server(http);
const Chat = require('./public/js/chat')
const capitalize = require('./public/js/caps');
const _ = require('lodash');
const os = require('os')

// console.log(os.platform())

app.use(express.static(__dirname + "/public"));


io.on('connection', socket => {
    console.log("connected")

    socket.on('join', user => {

        let newUser= Chat.addUsers({
            secret_id: user.secret_id,
            id: socket.id,
            name: capitalize(user.name),
            room_id: user.room_id
        });


        socket.join(newUser.room_id);

        socket.broadcast
            .to(newUser.room_id)
            .emit('announcement', `${newUser.name} has joined the chat.`);


        io.to(newUser.room_id).emit('active-users',
        {
            active: Chat.getUsersLength(newUser.room_id)
        })

        socket.on('chat', chat => {
            io.to(newUser.room_id).emit('chat', chat);
        })
    });

    socket.on('disconnect', () => {
        const users = Chat.removeUser(socket.id)
        console.log("leaved user: ", users)
        
        if(_.isEmpty(users)) return;
        io.to(users.room_id).emit('announcement', `${users.name} has left the chat.`);
        io.to(users.room_id).emit('active-users',
        {
            active: Chat.getUsersLength() === 0 ? 1 : Chat.getUsersLength()
        })
    })
});


const port = process.env.PORT || 3000

http.listen(port, () => console.log("listening on port ", port));
