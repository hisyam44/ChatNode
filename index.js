var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (request,response){
	response.sendFile(__dirname+'/index.html');
});

io.on('connection',function (socket){
	console.log('a user Connecting');
	socket.on('disconnect',function (){
		console.log('User disconnected');
	});
	socket.on('chat', function(msg){
		io.emit('chat',msg);
		console.log(msg);
	});
});

http.listen(8080, function (){
	console.log('Server Running in port 8080');
});