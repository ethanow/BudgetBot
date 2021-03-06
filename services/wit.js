'use strict'

var Config = require('../config')
var FB = require('../connectors/facebook')
var Wit = require('node-wit').Wit
var log = require('node-wit').log
var request = require('request')


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


var actions = {
	say (sessionId, context, message, cb) {
		// Bot testing mode, run cb() and return
		if (require.main === module) {
			cb()
			return
		}

		console.log('WIT.JS:WIT WANTS TO TALK TO:', context._fbid_)
		console.log('WIT.JS:WIT HAS SOMETHING TO SAY:', message)
		console.log('WIT.JS:WIT HAS A CONTEXT:', context)


		// Pass message to FB
		FB.newMessage(context._fbid_, message)	
		cb()
		
	},

	merge(sessionId, context, entities, message, cb) {
	  
    var cat = firstEntityValue(entities, 'category');
    if (cat) {
      context.category = cat;
      console.log('WIT.JS: Merge category is ', cat)
    }

   	
    var amt = firstEntityValue(entities, 'amount_of_money');
    if (amt) {
      context.amount = amt;
      console.log('WIT.JS: Merge amount is $',amt)
    }

		cb(context)
	},

	error(sessionId, context, error) {
		console.log("WIT.JS: Error",error.message)
	},

	// list of functions Wit.ai can execute
	
	['logSpend'](sessionId, context, cb) {
		console.log('WIT.JS: Update context.logSpend with ', context.amount, context.category)
		
		// Insert function to save the amount and category
		// If successful context.logSpend = 'Logged' else run missing branch flow

		// Hardcoded for now
		context.logSpend = 'Logged'
		// Reset the story
		delete context.category;
		delete context.amount;

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
};
