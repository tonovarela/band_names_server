const express = require('express');


const path = require('path');
const publicPath = path.resolve(__dirname, 'public');

require('dotenv').config();
const app = express();
// Node Server

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Mensajes de sockets




app.use(express.static(publicPath));

server.listen(process.env.PORT, (err)=> {
    if (err){
        throw new Error(err);
    }
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);

} )