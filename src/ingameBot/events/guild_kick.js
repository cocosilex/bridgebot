const { EmbedBuilder } = require("discord.js");
const SETTINGS = require("../../settings");
const client = require("../../client");
const { getUsername } = require("../functions/get_username");

module.exports = {
  kick: async (message) => {
    const kickEmbed = new EmbedBuilder()
      .setAuthor({
        name:'Member Kicked',
        iconURL:`https://mc-heads.net/avatar/${getUsername(message)}`
      })
      .setColor(0xFF0000)
      .setDescription(message.slice(9, message.length));
    await client.channels.cache.get(SETTINGS.channels.kickId).send({embeds : [kickEmbed]});
  },
};
