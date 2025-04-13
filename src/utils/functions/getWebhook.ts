import { TextChannel } from "discord.js";
import logger from "../logger.js";

export default async function getWebHook(channel: TextChannel) {
  try {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.find((wh) => wh.token);
    return webhook;
  } catch (error) {
    logger.error("Error when fetching a webhook: ", error);
  }
}
