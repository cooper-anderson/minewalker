#!/usr/local/bin/node

$ = require("jquery");
Discord = require("discord.js");
parseArgs = require("./parse-args");
settings = require("./settings.json");
minewalker = require("./minewalker");

bot = new Discord.Client();

bot.login(settings.token);


bot.on("message", function(msg) {

});

process.on("SIGINT", function() {
	bot.destroy();
	console.log("\n\nLogging out of bot.\n[Process closed]");
	process.exit();
});

