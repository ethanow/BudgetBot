'use strict'

var Config = require('../config')
var FB = require('../connectors/facebook')
var Wit = require('node-wit').Wit
var request = require('request')

//Extract an entity value from the entities returned by Wit
var firstEntityValue = function (entities, entity) {
	var val = entities && entities[entity] &&
		Array.isArray(entities[entity]) &&
		entities[entity].length > 0 &&
		entities[entity][0].value

	if (!val) {
		return null
	}
	return typeof val === 'object' ? val.value : val
}


/*
//Define your bot functions here
const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
        console.log('user said...', request.text);
        console.log('sending...', JSON.stringify(response));
        return resolve();
    });
  },
  ['compute-result']({context,entities}) {
    return new Promise(function(resolve, reject) {
      const movie_title = firstEntityValue(entities, 'movie');
      if (movie_title) {
        context.movie = movie_title;
      }
      //call the API here
      return resolve(context);
  });
 },
};
*/


var actions = {
	say (sessionId, context, message, cb) {
		// Bot testing mode, run cb() and return
		if (require.main === module) {
			cb()
			return
		}

		console.log('WIT WANTS TO TALK TO:', context._fbid_)
		console.log('WIT HAS SOMETHING TO SAY:', message)
		console.log('WIT HAS A CONTEXT:', context)

		if (checkURL(message)) {
			FB.newMessage(context._fbid_, message, true)
		} else {
			FB.newMessage(context._fbid_, message)
		}

		
		cb()
		
	},

	logSpend(sessionId, context, entities, message, cb){

		// Retrieve the category
		var category = firstEntityValue(entities, 'category')
		if (category) {
			context.cat = category
		}

		// Retrieve $ amount
		var amount = firstEntityValue(entities,'amount_of_money')
		if (amount) {
			context.amount = amount
		}

		var datetime = firstEntityValue(entities,'datetime')
		if (datetime){
			context.datetime = datetime
		}

		cb(context)

	},

	error(sessionId, context, error) {
		console.log(error.message)
	},

	// list of functions Wit.ai can execute
	['logSpend'](sessionId, context, cb){

		context.amount = amount_of_money
		context.cat = category
		console.log('Logging noDate')
		cb(context)

	},

	['logSpendDate'](sessionId, context, cb){

		context.amount = amount_of_money
		context.cat = category
		context.datetime = datetime
		console.log('Logging withDate')
		cb(context)

	},
	
}

// SETUP THE WIT.AI SERVICE
var getWit = function () {
	console.log('GRABBING WIT')
	return new Wit(Config.WIT_TOKEN, actions)
}

module.exports = {
	getWit: getWit,
}

// BOT TESTING MODE
if (require.main === module) {
	console.log('Bot testing mode!')
	var client = getWit()
	client.interactive()
}
