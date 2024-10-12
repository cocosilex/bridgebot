const client = require("../../client");
const SETTINGS = require("../../settings");
const { getWebHook } = require("../functions/get_webhook");

module.exports = {
  bridge: async (message) => {
    if(SETTINGS.channels.bridgeId === "-1") return;
    const informationsAboutSender = message.slice(0, message.indexOf(":"));
    const messageContent = message.slice(message.indexOf(":") + 2, message.length);

    let playerName;
    if (informationsAboutSender.endsWith("]")) {
      playerName = informationsAboutSender.slice(
        informationsAboutSender.lastIndexOf(" ",informationsAboutSender.lastIndexOf(" ") - 1) + 1,
        informationsAboutSender.lastIndexOf(" ")
      );
    } else {
      playerName = informationsAboutSender.slice(
        informationsAboutSender.lastIndexOf(" ") + 1,
        informationsAboutSender.length
      );
    }

    if (playerName === SETTINGS.minecraftAccount.pseudo) return;
    else {
      const truncedMessage = messageContent.replaceAll("`", "");
      const webhook = await getWebHook(
        client.channels.cache.get(SETTINGS.channels.bridgeId)
      );

      if (webhook) {
        await webhook.send({
          content: `\`${truncedMessage}\``,
          username: `${playerName}`,
          avatarURL: `https://mc-heads.net/avatar/${playerName}`,
        });
      } else {
        await client.channels.cache
          .get(SETTINGS.channels.bridgeId)
          .send("Webhook not found");
      }
    }
  },
};
