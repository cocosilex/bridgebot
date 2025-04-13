import { Client, Events } from "discord.js";
import logger from "../utils/logger.js";

export const name = Events.ClientReady;
export const once = true;
export function execute(client: Client) {
  if (client.user) logger.info(`Logged in discord as ${client.user.tag}.`);
}
