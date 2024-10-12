const { EmbedBuilder } = require("discord.js");
const SETTINGS = require("../../settings");
const client = require("../../client");
const { getUsername } = require("../functions/get_username");

module.exports = {
  join: async (message) => {
    if(SETTINGS.channels.leaveJoinId === "-1") return;
    const joinEmbed = new EmbedBuilder()
      .setAuthor({
        name:'Member Joined',
        iconURL:`https://mc-heads.net/avatar/${getUsername(message)}`
      })
      .setColor(0x008000)
      .setDescription(message.slice(9, message.length));
    await client.channels.cache.get(SETTINGS.channels.leaveJoinId).send({embeds : [joinEmbed]});
  },
};
