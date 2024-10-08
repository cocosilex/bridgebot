const { MessageType, messageLink } = require("discord.js");
const { sendMessageInChat } = require("./main");
var cron = require("node-cron");

let messagesToSend = []
module.exports = {
    send_message: (message, isReply) => {
        if (message.author.tag !== client.user.tag && message.channelId === SETTINGS.channels.bridgeId && ! message.author.bot) {
            if(message.type === MessageType.Reply) {
              const repliedMember = message.mentions.members.find(member => member.id = message.mentions.repliedUser.id)
              if(message.member.nickname && repliedMember.nickname) {
                    messagesToSend.push(`/gc ${message.member.nickname} > ${repliedMember.nickname}: ${message.content}`)
                 } else if (message.member.nickname) {  
                    messagesToSend.push(`/gc ${message.member.nickname} > ${message.mentions.repliedUser.id}: ${message.content}`)
                } else if(repliedMember.nickname) {
                    messagesToSend.push(`/gc ${message.member.displayName} > ${repliedMember.nickname}: ${message.content}`)
                } else {
                    messagesToSend.push(`/gc ${message.member.displayName} > ${message.mentions.repliedUser.displayName}: ${message.content}`)
                 }
            } else {
              if(message.member.nickname) {
                    messagesToSend.push(`/gc ${message.member.nickname}: ${message.content}`)
                 } else {
                    messagesToSend.push(`/gc ${message.member.displayName}: ${message.content}`)
                 }
            }
          } 
    }, 
    bridgeInit
}

function bridgeInit() {
    cron.schedule("*/5 * * * * *", () => {
      if(messagesToSend.length > 0) {
        sendMessageInChat(messagesToSend[0])
        messagesToSend.shift()
      }
    });
  }

