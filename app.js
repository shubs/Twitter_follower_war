var app = require('express')();
var http = require('http').Server(app);
var http_for_time = require('http');
var io = require('socket.io')(http);


// Inclusion of Mongoose
var mongoose = require('mongoose');
// So we connect to the DB
// do not forget to run ~/mongodb/bin/mongod in a seperate shell !
mongoose.connect('mongodb://localhost/twiiter', function(err) {
  if (err) { throw err; }
});
 
// Creation of a schema pour every change
var twiiter_log = new mongoose.Schema({
  follower_name : String,
  count : Number,
  date : { type : Date, default : Date.now }
});

// Creation of the model
var log_model = mongoose.model('log_model', twiiter_log);

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
		
		console.log(params.with + " was followed by " + json.source.name + " he now has " + json.target.followers_count + " followers");

		// Creation of instance of the model
		var log = new log_model({
			follower_name : json.source.name,
			count : json.target.followers_count
		});
		// Saving stuff
		log.save(function (err) {
		  if (err) { throw err; }
		  console.log('logged line !');
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
