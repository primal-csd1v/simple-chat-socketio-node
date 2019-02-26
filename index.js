let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

server.listen(3000);
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html')
});

let users = [];
let connections =[];

io.sockets.on('connection', function (socket) {
    console.log('con suc');
    connections.push(socket);

    socket.on('disconnect', function (data) {
	connections.splice(connections.indexOf(socket), 1)
	console.log('uncon suc');
    });

    socket.on('send mess', function (data) {
	io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className})
    });
});