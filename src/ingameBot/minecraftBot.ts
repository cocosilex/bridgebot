import mineflayer from 'mineflayer';
import { Bot } from 'mineflayer';
import { SETTINGS } from '../utils/settings.js';
import bridge_manager from './bridge_manager.js';
import logger from '../utils/logger.js';
import { EmbedBuilder, TextChannel } from 'discord.js';
import client from '../utils/client.js';

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
        if (!process.env.MINECRAFT_EMAIL) {
            throw new Error('Minecraft credentials not set in environment variables');
        }

        return mineflayer.createBot({
            host: 'hypixel.net',
            username: process.env.MINECRAFT_EMAIL,
            version: '1.8.9',
            auth: 'microsoft',
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
        this.bot.on('message', async (message: MinecraftChatMessage) => {
            if (message.toString()) {
                await bridge_manager(message.toString());
            }
        });

        this.bot.once('spawn', async () => {
            logger.info(`Logged to hypixel with success as ${this.bot.username || 'Unknown'}.`);
            this.autoReconnectCooldown = SETTINGS.autoReconnectToMinecraftCooldown;

            if (SETTINGS.sendNotificationWhenBotLogInOff) {
                const loggedInEmbed = new EmbedBuilder()
                    .setColor(0x008000)
                    .setAuthor({ name: 'Minecraft Bot Connection' })
                    .setDescription(`:white_check_markThe application is now logged in Hypixel as **${this.bot.username || 'unknown'}**`);

                const bridgeChannel = client.channels.cache.get(SETTINGS.channels.bridgeId) as TextChannel;
                await bridgeChannel.send({ embeds: [loggedInEmbed] });
            }
        });

        this.bot.on('end', async () => {
            logger.warn(`The bot was disconnected from hypixel`);

            if (SETTINGS.sendNotificationWhenBotLogInOff) {
                const loggedOutEmbed = new EmbedBuilder()
                    .setColor(0x008000)
                    .setAuthor({ name: 'Minecraft Bot Connection' })
                    .setDescription(`:no_entry: The application was disconnected from Hypixel`);

                const bridgeChannel = client.channels.cache.get(SETTINGS.channels.bridgeId) as TextChannel;
                await bridgeChannel.send({ embeds: [loggedOutEmbed] });
            }

            this.reconnectBot();
            if (this.autoReconnectCooldown < 30_000) {
                this.autoReconnectCooldown = this.autoReconnectCooldown * 1.5;
            }
        });

        this.bot.on('error', async (error) => {
            logger.error(`Error in minecraft bot`, error);

            if (SETTINGS.sendNotificationWhenBotLogInOff) {
                const loggedOutEmbed = new EmbedBuilder()
                    .setColor(0x008000)
                    .setAuthor({ name: 'Minecraft Bot Connection' })
                    .setDescription(`:no_entry: The application was disconnected from Hypixel`);

                const bridgeChannel = client.channels.cache.get(SETTINGS.channels.bridgeId) as TextChannel;
                await bridgeChannel.send({ embeds: [loggedOutEmbed] });
            }

            this.reconnectBot();
            if (this.autoReconnectCooldown < 30_000) {
                this.autoReconnectCooldown = this.autoReconnectCooldown * 1.5;
            }
        });
    }

    public getUsername(): string {
        return this.bot.username || 'unknown';
    }
    public sendMessageInGuildChat(message: string): void {
        this.bot.chat(`/gc ${message}`);
    }
}

const minecraftBot = new MinecraftBot();

export default minecraftBot;
