Twitter Follower War 
=========

The follower war is small follower challenge with monitoring an reporting.

Follower war was a little challenge with a friend [Charles Collas], which was to do a race followers. We had follower of departure and the matter was to see the biggest increase in a month. Here is what you have in this repo.

  - An backend script which monitors followers with thw [twitter API] and [Node.js]
  - A Realtime DB system to log the data with [Firebase]
  - A Mail digest every single using [Mailjet]


Version
----

0.7 *In development*

Status
----

  - 0.1 Creation of back
  - 0.2 Link with front
  - 0.4 Link with twitter API
  - 0.7 Link with Firebase
  - 0.9 Link with Mailjet
  - 1.0 First version

Tech
-----------

This uses a number projects to work properly:

* [Twitter API] - great UI boilerplate for modern web apps
* [Node.js] - evented I/O for the backend
* [Firebase] - A powerful API to store and sync data in realtime.
* [Twitter Bootstrap]: A powerful front-end framework for faster design
* [Mailjet] - The all-in-one email delivery engine

Installation
--------------

```sh
git clone [git-repo-url] Twitter_follower_war
cd Twitter_follower_war
npm i -d
```
TDB GRUNT + MANGODB install

##### To configure Credentials create a file at the root called ./credentials.js and of course enter your keys

```js
module.exports = {
	twitter:{
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	},
	mailjet:{
		apikey : '',
		apikeysecret : ''
	}
}
```

Usage
--------------
```sh
node app
```
And check [localhost]


**Mmmmmh Enjoy and Please send me an [Email] if you need assistance or further information on this ;).**

[Charles Collas]:https://github.com/CharlesCollas
[Mailjet]:http://mailjet.com
[Firebase]:https://www.firebase.com
[Twitter API]:https://dev.twitter.com/
[Node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[Email]:mailto:shubham@sharma.fr
[localhost]:http://localhost/
