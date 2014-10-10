var app = require('express')();
var http = require('http').Server(app);
var http_for_time = require('http');
var io = require('socket.io')(http);

var credentials = require('./credentials.js');

var Twitter_stream = require('user-stream');
var stream = new Twitter_stream(credentials.twitter);
var params = {
    with: 'shub_s' // The id of your competitor :)
}

// create the twitter stream
stream.stream(params);

//listen stream data
stream.on('data', function(json) {

	//here traking when someone followes hi,
	if ((typeof json.event != 'undefined') && (json.event == 'follow')) {
		console.log(params.with + " was followed by " + json.source.name + " he now has " + json.target.followers_count + "followers");
	};
});

stream.on('connected', function(json) {
  console.log("Twitter user connected");
});

app.get('/', function(req, res){
  res.sendfile('front/index.html');
});

http.listen(80, function(){
  console.log('listening on http://localhost:80');
});
