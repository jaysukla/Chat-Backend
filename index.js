const http = require('http');
const express = require('express');
const aap = express();
const cors = require('cors')
const server = http.createServer(aap);

// const port = process.env.PORT || 3000



aap.get('/',(req,res)=>{
      
res.send("Api based Url")
})


/*  socket.io setup   */

const io= require('socket.io')(server);

const users= {};




io.on('connection',(socket)=>{
    
socket.on('new-user-joined',(username)=>{
    users[socket.id]=username;
    // console.log(users)
socket.broadcast.emit('user-connected',username)

io.emit('user-list',users);
console.log(users)
})

socket.on('disconnect',()=>{
    socket.broadcast.emit('user-disconnected',user=users[socket.id]);
    delete users[socket.id];
 
    io.emit('user-list',users)
})


socket.on('message',(data)=>{
    socket.broadcast.emit('massage',data)
})


})



server.listen(3000,()=>{
    console.log("Listning to [port 3000]")
})

