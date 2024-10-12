const { EmbedBuilder } = require("discord.js");
const SETTINGS = require("../../settings");
const client = require("../../client");
const { getUsername } = require("../functions/get_username");

module.exports = {
  promote: async (message) => {
    if(SETTINGS.channels.promoteDemoteId === "-1") return;
    const promoteEmbed = new EmbedBuilder()
      .setAuthor({
        name:'Member Promoted',
        iconURL:`https://mc-heads.net/avatar/${getUsername(message)}`
      })
      .setColor(0x008000)
      .setDescription(message);
    await client.channels.cache.get(SETTINGS.channels.promoteDemoteId).send({embeds : [promoteEmbed]});
  },
};
