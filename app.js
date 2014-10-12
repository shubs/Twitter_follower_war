// This file have to be created in the root folder to specify your twitter and mailjet credentials
var credentials = require('./credentials.js');

// We need Express and http to use this app as a server
var app = require('express')();
var http = require('http').Server(app);

// importing moment module for time handling
var moment = require('moment');

// importing cron for sending daily digest by mailjet
var CronJob = require('cron').CronJob;

//importing mailjet node module to send those emails
var Mailjet = require('mailjet-sendemail');
var mj = new Mailjet(credentials.mailjet.apikey, credentials.mailjet.apikeysecret);

// Using the Twitter streaming API and setting it up using the credentials
var Twitter_stream = require('user-stream');
var stream = new Twitter_stream(credentials.twitter);

// competition data import (to specify in ./competition.js)
var competition = require('./competition.js');

var params = {
    with: competition.you.account + ', ' + competition.competitor.account // The id of your competitors and you :)
}

// Connetion with firebase
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://twitterwar.firebaseio.com/");

// create the twitter stream
stream.stream(params);

// just war us when we are connected to the twitter API
stream.on('connected', function(json) {
  console.log("Twitter user connected");
});

//listen stream data when twitter sends something
stream.on('data', function(json) {

	//here traking when someone followes someone,
	if ((typeof json.event != 'undefined') && (json.event == 'follow')) {
			
		console.log(json.target.screen_name + " was followed by " + json.source.name + " -> Count : " + json.target.followers_count + " followers !");
		
		// this is the name of the node in the firebase DB
		var node_name = "";

		// this is the difference between the count and the initial count
		var progress = 0;

		if (json.target.screen_name == competition.you.account) {
			node_name = "you";
			progress = json.target.followers_count - competition.you.initial_count;
		};

		if (json.target.screen_name == competition.competitor.account) {
			node_name = "competitor";
			progress = json.target.followers_count - competition.competitor.initial_count;
		};

		// here pushing data in firebase
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
			statuses_count : json.target.statuses_count,
			date : moment().format('MMMM Do YYYY, hh:mm:ss')
		});

	};

});

// function creating and sending the digest email
function send_my_digest(content){
	mailjet.sendContent('TwitterWar@sharma.fr',
         ['shubham@sharma.fr'],
         'Twitter War - '+ moment().format('MMMM Do YYYY, hh:mm:ss'),
         content,
         1)
}

//Cron job which sends an email at midnight every day
new CronJob('0 0 * * * *', function(){
    console.log('--------> Sending digest');
    send_my_digest("some html");
}, null, true, "Europe/Paris");

app.get('/', function(req, res){
  res.sendfile('front/index.html');
});

http.listen(80, function(){
  console.log('listening on http://localhost:80');
});
