const { Events, MessageType } = require("discord.js");
const SETTINGS = require("../settings");
const client = require("../client");
const { sendMessageInChat } = require("../ingameBot/main");


module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.tag !== client.user.tag && message.channelId === SETTINGS.channels.bridgeId && ! message.author.bot) {
      if(message.type === MessageType.Reply) {
        if(message.member.nickname) {
            sendMessageInChat(`/gc ${message.member.nickname} > ${message.mentions.repliedUser.displayName}: ${message.content}`)
           } else {
            sendMessageInChat(`/gc ${message.member.displayName} > ${message.mentions.repliedUser.displayName}: ${message.content}`)
           }
      } else {
        if(message.member.nickname) {
            sendMessageInChat(`/gc ${message.member.nickname}: ${message.content}`)
           } else {
            sendMessageInChat(`/gc ${message.member.displayName}: ${message.content}`)
           }
      }
    } 
  },
};