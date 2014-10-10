Twitter Follower War 
=========

Follower war was a little challenge with a friend [Charles Collas], which was to do a race followers. We had follower of departure and the matter was to see the biggest increase in a month. Here is what you have in this repo.

  - An backend script which monitors followers with thw [twitter API] and [Node.js]
  - A single web page to see the status of the war using [Socket.io]
  - A DB system to log the data with [MangoDB]
  - A Mail digest every single using [Mailjet]


Version
----

0.1 *In development*

Tech
-----------

This uses a number projects to work properly:

* [Twitter API] - great UI boilerplate for modern web apps
* [Node.js] - evented I/O for the backend
* [Socket.io] - Socket.IO enables real-time bidirectional event-based communication.
* [MangoDB] - an open-source document database
* [Twitter Bootstrap]: A owerful front-end framework for faster design
* [Mailjet] - The all-in-one email delivery engine

Installation
--------------

```sh
git clone [git-repo-url] Twitter_follower_war
cd Twitter_follower_war
npm i -d
```

##### Configure Credentials. Instructions in following README.md files

* libs/mailjet/README.md
* libs/mangoDB/README.md
* libs/twitterAPI/README.md

```sh
node app
```


**Mmmmmh Enjoy and Please send me an [Email] if you need assistance or further information on this ;).**

[Charles Collas]:https://github.com/CharlesCollas
[Mailjet]:http://mailjet.com
[Socket.io]:http://socket.io/
[MangoDB]:http://www.mongodb.org/
[Twitter API]:https://dev.twitter.com/
[Node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[Email]:mailto:shubham@sharma.fr
