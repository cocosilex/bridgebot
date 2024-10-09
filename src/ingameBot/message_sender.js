const { MessageType } = require("discord.js");
const { sendMessageInChat } = require("./main");
const SETTINGS = require("../settings");
const client = require("../client");
var cron = require("node-cron");

let messagesToSend = []
module.exports = {
    send_message: (message) => {
        if (message.author.tag !== client.user.tag && message.channelId === SETTINGS.channels.bridgeId && ! message.author.bot) {
            let messageToSend 
            if(message.type === MessageType.Reply) {
              const repliedMember = message.mentions.members.find(member => member.id = message.mentions.repliedUser.id)
              
              if(message.member.nickname && repliedMember.nickname) {
                    messageToSend = `/gc ${message.member.nickname} > ${repliedMember.nickname}: ${message.content}`
                 } else if (message.member.nickname) {  
                    messageToSend = `/gc ${message.member.nickname} > ${message.mentions.repliedUser.displayName}: ${message.content}`
                } else if(!repliedMember) {
                    messageToSend = `/gc ${message.member.displayName} > ${message.mentions.repliedUser.displayName}: ${message.content}`
                } else if(repliedMember.nickname) {
                    messageToSend = `/gc ${message.member.displayName} > ${repliedMember.nickname}: ${message.content}`
                } else {
                    messageToSend = `/gc ${message.member.displayName} > ${message.mentions.repliedUser.displayName}: ${message.content}`
                 }
            } else {
              if(message.member.nickname) {
                    messageToSend = `/gc ${message.member.nickname}: ${message.content}`
                 } else {
                    messageToSend = `/gc ${message.member.displayName}: ${message.content}`
                 }
            }
            
            if(messageToSend.length < 128) {
                messagesToSend.push(messageToSend)
            } else {
                for(let i = 0; Math.ceil(messageToSend.length/128); i++) {
                    if(i + 1 === Math.ceil(messageToSend.length/128)) {
                        messagesToSend.push(messageToSend.slice(i*128, messageToSend.length))
                    } else {
                        messagesToSend.push(messageToSend.slice(i*128, (i + 1)*128))
                    }
                }
            }
          } 
    }, 
    bridgeInit
}

function bridgeInit() {
    console.log('bridgeinit')
    cron.schedule(`*/${SETTINGS.bridgeCooldown} * * * * *`, () => {
      if(messagesToSend.length > 0) {
        sendMessageInChat(messagesToSend[0])
        messagesToSend.shift()
      }
    });
  }

