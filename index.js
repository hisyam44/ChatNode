var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port',(process.env.PORT || 5000))
app.get('/', function (request,response){
	response.sendFile(__dirname+'/index.html');
});
var num = 0;
io.on('connection',function (socket){
	num += 1;
	io.emit('Online',num);
	console.log('Users Online : '+num);
	socket.on('disconnect',function (){
		num -= 1;
		io.emit('Online',num);
		console.log('Users Online : '+num);
	});
	socket.on('chat', function(msg){
		io.emit('chat',msg);
	});
});

http.listen(app.get('port'), function (){
	console.log('Server Running in port 8080');
});