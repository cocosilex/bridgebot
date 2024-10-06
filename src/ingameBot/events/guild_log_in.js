const { EmbedBuilder } = require("discord.js");
const SETTINGS = require("../../settings");
const client = require("../../client");
const { getWebHook } = require("../functions/get_webhook");

module.exports = {
  log_in: async (message) => {
    const logInEmbed = new EmbedBuilder()
      .setColor(0x008000)
      .setDescription(message.slice(16, message.length));
    const webhook = await getWebHook(
      client.channels.cache.get(SETTINGS.channels.logInOffId)
    );
    if (webhook) {
      await webhook.send({
        embeds: [logInEmbed],
        username: `${message.slice(16, message.indexOf(" ", 16))}`,
        avatarURL: `https://mc-heads.net/avatar/${message.slice(16,message.indexOf(" ", 16))}`,
      });
    } else {
      await client.channels.cache.get(SETTINGS.channels.logInOffId).send("Webhook not found");
    }
  },
};
