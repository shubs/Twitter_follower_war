var app = require('express')();
var http = require('http').Server(app);
var http_for_time = require('http');

var moment = require('moment');

var credentials = require('./credentials.js');

var Twitter_stream = require('user-stream');
var stream = new Twitter_stream(credentials.twitter);

var your_account = 'shub_s';
var your_account_initial_count = 408;
var competitor_account = 'CharlesCollas';
var competitor_account_initial_count = 318;

var params = {
    with: your_account + ', ' + competitor_account // The id of your competitors and you :)
}

var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://twitterwar.firebaseio.com/");

// create the twitter stream
stream.stream(params);

//listen stream data
stream.on('data', function(json) {

	//here traking when someone followes hi,
	if ((typeof json.event != 'undefined') && (json.event == 'follow')) {
			
		console.log(json.target.screen_name + " was followed by " + json.source.name + " -> Count : " + json.target.followers_count + " followers !");
		
		var node_name = "";
		var progress = 0;

		if (json.target.screen_name == your_account) {
			node_name = "you";
			progress = json.target.followers_count - your_account_initial_count;
		};

		if (json.target.screen_name == competitor_account) {
			node_name = "competitor";
			progress = json.target.followers_count - competitor_account_initial_count;
		};

		var postsRef = myFirebaseRef.child(node_name);
		postsRef.push({
			follower_screen_name : json.source.screen_name,
			follower_name : json.source.name,
			follower_img : json.source.profile_image_url,
			screen_name : json.target.screen_name,
			name : json.target.name,
			img : json.target.profile_image_url,
			count : json.target.followers_count,
			progress : progress,
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
