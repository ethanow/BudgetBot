'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var fetch = require('node-fetch')
var crypto = require('crypto')

var Config = require('./config')
var FB = require('./connectors/facebook')
var Bot = require('./bot')

const FB_PROFILE_ENDPOINT = "https://graph.facebook.com/v2.6/";


// LETS MAKE A SERVER!
var app = express()
app.set('port', (process.env.PORT) || 5000)
// SPIN UP SERVER
app.listen(app.get('port'), function () {
  console.log('Running on port', app.get('port'))
})
// PARSE THE BODY
app.use(bodyParser.json())


// index page
app.get('/', function (req, res) {
  res.send('hello world i am a chat bot')
})

// for facebook to verify
app.get('/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

console.log("I'm live!")

var MongoClient = require('mongodb').MongoClient
 , assert = require('assert');

// Connection URL
 var url = 'mongodb://heroku_lx50p828:f6tfa855041uh884cnroaj994m@ds139277.mlab.com:39277/heroku_lx50p828';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
 assert.equal(null, err);
 console.log("Connected correctly to server");
 db.close();
});

// to send and receive messages to facebook
app.post('/webhooks', function (req, res) {
  var entry = FB.getMessageEntry(req.body)
  // IS THE ENTRY A VALID MESSAGE?
  if (entry && entry.message) {
    if (entry.message.attachments) {
      // NOT SMART ENOUGH FOR ATTACHMENTS YET
      FB.newMessage(entry.sender.id, "That's interesting!")
    } else {
      console.log("INDEX.JS:Received message from ",entry.sender.id)
      console.log("INDEX.JS:message is",entry.message.text)
      // FB.newMessage(entry.sender.id,entry.message.text)

      // SEND TO BOT FOR PROCESSING bot.js read
      Bot.read(entry.sender.id, entry.message.text, function (sender, reply) {
        // Reply to sender using facebook.js
        FB.newMessage(sender, reply)
      })
    }
  }

  res.sendStatus(200)
})

FB.api('fql', { q: [
    'SELECT uid FROM user WHERE uid=me()',
      'SELECT name FROM user WHERE uid=me()'
] }, function(res) {
    if(!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
              return;
                }
      console.log(res.data[0].fql_result_set);
        console.log(res.data[1].fql_result_set);
});
// wit.ai bot's ID: 910581902328591
