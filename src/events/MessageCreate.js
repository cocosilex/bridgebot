const { Events } = require("discord.js");
const { send_message } = require("../ingameBot/message_sender");


module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    send_message(message)
  },
};