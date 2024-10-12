const { EmbedBuilder } = require("discord.js");
const SETTINGS = require("../../settings");
const client = require("../../client");
const { getUsername } = require("../functions/get_username");

module.exports = {
  leave: async (message) => {
    if(SETTINGS.channels.leaveJoinId === "-1") return;
    const leaveEmbed = new EmbedBuilder()
      .setAuthor({
        name:'Member Leave',
        iconURL:`https://mc-heads.net/avatar/${getUsername(message)}`
      })
      .setColor(0xFF0000)
      .setDescription(message.slice(9, message.length));
    await client.channels.cache.get(SETTINGS.channels.leaveJoinId).send({embeds : [leaveEmbed]});
  },
};
