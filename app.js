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

// Using the Twitter REST API and setting it up using the credentials
// var util = require('util'),
//     twitter = require('twitter');
// var twit = new twitter(credentials.twitter);
var Twit = require('twit');
var T = new Twit({
		consumer_key: 'BsbTj5MCLeTaUFATZrRlVmmSj',
		consumer_secret: 'ygf8eXWlQrWLigkOJAG7lFc1QkgTGU7Wwoh4ZJxYABrSprLyl1',
		access_token: '39555082-JIlybB8E7KOG5RIXfSrEmpmIzV417lDK8CdTqvBw1',
		access_token_secret: 'TIFGj8ZeZQLxFikdmAxtOuSV5uptYCHjtf8hkCHxwkK6b'
});
//
//  tweet 'hello world!'
//

// competition data import (to specify in ./competition.js)
var competition = require('./competition.js');

// Connetion with firebase
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://twitterwar.firebaseio.com/");

var users = competition.you.account + ',' + competition.competitor.account;

T.get('users/lookup', { screen_name: users },  function (err, data, response) {

	var res = {
		competitor_screen_name : data[1].screen_name,
		competitor_name : data[1].name,
		competitor_img : data[1].profile_image_url,
		competitor_count : data[1].followers_count,
		competitor_statuses_count : data[1].statuses_count,
		competitor_progress : data[1].followers_count - competition.competitor.initial_count,
		you_screen_name : data[0].screen_name,
		you_name : data[0].name,
		you_img : data[0].profile_image_url,
		you_statuses_count : data[0].statuses_count,
		you_count : data[0].followers_count,
		you_progress : data[0].followers_count - competition.you.initial_count,
		date : moment().format('MMMM Do YYYY, hh:mm:ss')
	};

	// here pushing data in firebase
	var postsRef = myFirebaseRef.child('state');

	postsRef.set(res);

	console.log('Updated on ' + moment().format('MMMM Do YYYY, hh:mm:ss'));
});

// function creating and sending the digest email
function send_my_digest(content){
	mj.sendContent('TwitterWar@sharma.fr',
         ['shubham@sharma.fr'],
         'Twitter War - '+ moment().format('MMMM Do YYYY, hh:mm:ss'),
         content,
         1);
}

//Cron job which sends an email at midnight every day
new CronJob('0 0 * * * *', function(){
    console.log('--------> Sending digest');
    //send_my_digest("some html");
}, null, true, "Europe/Paris");

app.get('/', function(req, res){
  res.sendfile('front/index.html');
});

var port = Number(process.env.PORT || 5000);
http.listen(port, function(){
    console.log('listening on http://localhost:'+port);
});

