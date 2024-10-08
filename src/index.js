const { Collection } = require("discord.js");
const client = require("./client.js");
const { bridgeInit } = require("./ingameBot/message_sender.js");
require("./process.js");

client.commands = new Collection();
client.connect();
bridgeInit()
