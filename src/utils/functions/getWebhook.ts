import { TextChannel } from "discord.js";
import logger from "../logger.js";

export default async function getWebHook(channel: TextChannel) {
  try {
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((wh) => wh.token);
    
    if (!webhook) {
      // Créer un webhook s'il n'en existe pas
      webhook = await channel.createWebhook({
        name: "Bridgebot",
        reason: "Webhook created automatically for bridge functionality"
      });
      logger.info(`Created new webhook in channel ${channel.name}`);
    }
    
    return webhook;
  } catch (error) {
    logger.error("Error when fetching/creating webhook: ", error);
    return null;
  }
}
