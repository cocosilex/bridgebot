const { Events } = require("discord.js");
const SETTINGS = require("../settings");
const client = require("../client");
const { sendMessageInChat } = require("../ingameBot/main");


module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    
  },
};