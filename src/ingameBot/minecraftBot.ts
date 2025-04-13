import mineflayer from "mineflayer";
import { Bot } from "mineflayer";
import { SETTINGS } from "../utils/settings.js";
import bridge_manager from "./bridge_manager.js";
import logger from "../utils/logger.js";

interface MinecraftChatMessage {
  toString: () => string;
  toAnsi: () => string;
  json: {
    text?: string;
  };
}

class MinecraftBot {
  private bot: Bot;
  private autoReconnectCooldown: number = SETTINGS.autoReconnectToMinecraftCooldown;
  private isConnecting = false;

  constructor() {
    this.bot = this.createBot();
    this.setupEventHandlers();
  }

  private createBot(): Bot {
    if (!process.env.MINECRAFT_EMAIL || !process.env.MINECRAFT_PASSWORD) {
      throw new Error("Minecraft credentials not set in environment variables");
    }

    return mineflayer.createBot({
      host: "hypixel.net",
      username: process.env.MINECRAFT_EMAIL,
      password: process.env.MINECRAFT_PASSWORD,
      version: "1.8.9",
      auth: "microsoft",
    });
  }

  public reconnectBot(): void {
    if (this.isConnecting) {
      logger.warn(`Already trying to reconnect...`);
      return;
    }

    logger.info(`Trying to reconnect in ${this.autoReconnectCooldown / 1000}s...`);
    this.isConnecting = true;
    setTimeout(() => {
      this.bot = this.createBot();
      this.setupEventHandlers();
      this.isConnecting = false;
    }, this.autoReconnectCooldown);
  }

  private setupEventHandlers(): void {
    this.bot.on("message", async (message: MinecraftChatMessage) => {
      const realMessage = `message ${message.toString()}`;
      await bridge_manager(realMessage);
    });

    this.bot.once("spawn", async () => {
      logger.info(`Logged to hypixel with success as ${process.env.MINECRAFT_PSEUDO || "no pseudo found"}.`);
      this.autoReconnectCooldown = SETTINGS.autoReconnectToMinecraftCooldown;
    });

    this.bot.on("end", () => {
      logger.warn(`The bot was disconnected from hypixel`);
      this.reconnectBot();
      if (this.autoReconnectCooldown < 30_000) {
        this.autoReconnectCooldown = this.autoReconnectCooldown * 1.5;
      }
    });

    this.bot.on("error", (error) => {
      logger.error(`Error in minecraft bot`, error);

      this.reconnectBot();
      if (this.autoReconnectCooldown < 30_000) {
        this.autoReconnectCooldown = this.autoReconnectCooldown * 1.5;
      }
    });
  }

  public sendMessageInGuildChat(message: string): void {
    this.bot.chat(`/gc ${message}`);
  }
}

const minecraftBot = new MinecraftBot();

export default minecraftBot;
