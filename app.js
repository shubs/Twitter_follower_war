var app = require('express')();
var http = require('http').Server(app);
var http_for_time = require('http');

var moment = require('moment');

var credentials = require('./credentials.js');

var Twitter_stream = require('user-stream');
var stream = new Twitter_stream(credentials.twitter);
var params = {
    with: 'shub_s' // The id of your competitor :)
}

var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://twitterwar.firebaseio.com/");

// create the twitter stream
stream.stream(params);

//listen stream data
stream.on('data', function(json) {
	//here traking when someone followes hi,
	if ((typeof json.event != 'undefined') && (json.event == 'follow')) {
		console.log(params.with + " was followed by " + json.source.name + " he now has " + json.target.followers_count + " followers !");
	
		
		myFirebaseRef.push({
			screen_name : json.source.screen_name,
			name : json.source.name,
			img : json.source.profile_image_url,
			count : json.target.followers_count,
			date : moment().format('MMMM Do YYYY, hh:mm:ss')
		});
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
