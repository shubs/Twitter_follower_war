var app = require('express')();
var http = require('http').Server(app);
var http_for_time = require('http');
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendfile('index.html');
});

setInterval(function(){
	console.log("hello");

	io.emit('update', { msg: 'Hey dude'});

}, 2000);

http.listen(80, function(){
  console.log('listening on http://localhost:80');
});
