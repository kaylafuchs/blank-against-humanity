var Botkit = require('botkit');
var env = require('../env/development')

var controller = Botkit.slackbot({
	debug: false
})

controller.spawn({
	token: env.SLACKBOT_TOKEN,
}).startRTM()

controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], function(bot, message){
	bot.reply(message, 'I\'m alive!');
})

controller.hears('#BLACKCARD', ['direct_mention', 'direct_message', 'mention'], function(bot, message){
	bot.reply(message, "New black card created: " + message.text.replace(message.match[0],"").trim());
})

controller.hears('#WHITECARD', ['direct_mention', 'direct_message', 'mention'], function(bot, message){
	bot.reply(message, "New white card created: " + message.text.replace(message.match[0],"").trim());
})