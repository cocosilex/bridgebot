import { SETTINGS } from "../settings.js";
import logger from "../logger.js";
import client from "../client.js";
import { TextChannel } from "discord.js";

export default function checkAllVariables() {
  try {
    if (!process.env.DISCORD_TOKEN || process.env.DISCORD_TOKEN === "DISCORD_TOKEN") {
      const errorMsg = "DISCORD_TOKEN is not defined, please define it in .env file or provide it to docker in the CLI args";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (!process.env.MINECRAFT_PSEUDO || process.env.MINECRAFT_PSEUDO === "MINECRAFT_PSEUDO") {
      const errorMsg = "MINECRAFT_PSEUDO is not defined, please define it in .env file or provide it to docker in the CLI args";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (!process.env.MINECRAFT_EMAIL || process.env.MINECRAFT_EMAIL === "MINECRAFT_EMAIL") {
      const errorMsg = "MINECRAFT_EMAIL is not defined, please define it in .env file or provide it to docker in the CLI args";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (!process.env.MINECRAFT_PASSWORD || process.env.MINECRAFT_PASSWORD === "MINECRAFT_PASSWORD") {
      const errorMsg = "MINECRAFT_PASSWORD is not defined, please define it in .env file or provide it to docker in the CLI args";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (!SETTINGS.autoReconnectToMinecraftCooldown) {
      const errorMsg = "autoReconnectToMinecraftCooldown is not defined, please define it in settings.ts file";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (!SETTINGS.bridgeCooldown) {
      const errorMsg = "bridgeCooldown is not defined, please define it in settings.ts file";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    if (!SETTINGS.maxMessagesInQueue) {
      const errorMsg = "maxMessagesInQueue is not defined, please define it in settings.ts file";
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    for (const channel in SETTINGS.channels) {
      if (!SETTINGS.channels[channel as keyof typeof SETTINGS.channels]) {
        const errorMsg = `${channel} is not defined, please set the correct channel id or "-1" if you want to disable the feature in settings.ts file`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      } else if (!(client.channels.cache.get(SETTINGS.channels[channel as keyof typeof SETTINGS.channels]) instanceof TextChannel)) {
        const errorMsg = `${channel} is not a text channel, please insert an id of a Text Channel or "-1" if you want to disable the feature in settings.ts file`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Configuration error: ${error.message}`);
    } else {
      logger.error(`Unknown error occurred during configuration check`);
    }
    throw error;
  }
}
