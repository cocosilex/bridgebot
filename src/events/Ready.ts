import { Client, Events } from "discord.js";
import logger from "../utils/logger.js";
import checkAllVariables from "../utils/functions/checkAllVariables.js";

export const name = Events.ClientReady;
export const once = true;
export function execute(client: Client) {
  if (client.user) logger.info(`Logged in discord as ${client.user.tag}.`);
  
  try {
    checkAllVariables();
    logger.info("All variables checked successfully");
  } catch (error) {
    logger.error("Failed to validate configuration, shutting down...");
    process.exit(1);
  }
}
