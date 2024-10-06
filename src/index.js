const { Collection } = require("discord.js");
const client = require("./client.js");
require("./process.js");

client.commands = new Collection();
client.connect();
