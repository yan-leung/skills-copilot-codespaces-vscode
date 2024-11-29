//create web server
const express = require('express');
const app = express();
//create a server
const http = require('http');
const server = http.createServer(app);
//create a socket
const io = require('socket.io')(server);
//create a port
const port = 3000;