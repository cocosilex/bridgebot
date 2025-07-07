import { Message, MessageType } from 'discord.js';
import { SETTINGS } from '../utils/settings.js';
import logger from '../utils/logger.js';
import client from '../utils/client.js';
import bot from './minecraftBot.js';
import cron from 'node-cron';

interface MessageQueueItem {
	content: string;
	priority: number;
	timestamp: number;
}

class MessageSender {
	private messageQueue: MessageQueueItem[] = [];
	private readonly MAX_QUEUE_SIZE: number = SETTINGS.maxMessagesInQueue;
	private readonly MAX_MESSAGE_LENGTH: number = 110;
	private cronJob: cron.ScheduledTask | null = null;

	public send_message(message: Message): void {
		if (message.author.tag === client.user?.tag || message.channelId !== SETTINGS.channels.bridgeId || message.author.bot) {
			return;
		}

		const formattedMessage = message.type === MessageType.Reply ? this.formatReplyMessage(message) : this.formatRegularMessage(message);

		const messageParts = this.splitLongMessage(formattedMessage);

		messageParts.forEach((part) => {
			if (this.messageQueue.length < this.MAX_QUEUE_SIZE) {
				this.messageQueue.push({
					content: part,
					priority: messageParts.length > 1 ? 1 : 0,
					timestamp: Date.now(),
				});
			}
		});

		this.sortQueue();
	}

	public bridgeInit(): void {
		this.cronJob = cron.schedule(`*/${SETTINGS.bridgeCooldown} * * * * *`, () => {
			this.processNextMessage();
		});
	}

	public shutdown(): void {
		if (this.cronJob) {
			this.cronJob.stop();
		}
	}

	public getQueueLength(): number {
		return this.messageQueue.length;
	}

	private formatReplyMessage(message: Message): string {
		const repliedMember = message.mentions.members?.find((member) => member.id === message.mentions.repliedUser?.id);

		const senderName = message.member?.nickname || message.member?.displayName;
		let receiverName = 'unknown';

		if (repliedMember) {
			receiverName = repliedMember.nickname || repliedMember.displayName;
		} else if (message.mentions.repliedUser) {
			receiverName = message.mentions.repliedUser.displayName;
		}

		return `${senderName} > ${receiverName}: ${message.content}`;
	}

	private formatRegularMessage(message: Message): string {
		const senderName = message.member?.nickname || message.member?.displayName;
		return `${senderName}: ${message.content}`;
	}

	private splitLongMessage(message: string): string[] {
		if (message.length <= this.MAX_MESSAGE_LENGTH) {
			return [message];
		}

		const parts: string[] = [];
		let currentPart = '';
		const words = message.split(/\s+/);

		for (const word of words) {
			if (currentPart.length + word.length + 1 > this.MAX_MESSAGE_LENGTH) {
				if (currentPart.length > 0) {
					parts.push(currentPart.trim());
					currentPart = word + ' ';
				} else {
					const chunkedWord = word.match(new RegExp(`.{1,${this.MAX_MESSAGE_LENGTH}}`, 'g')) || [];
					parts.push(...chunkedWord);
				}
			} else {
				currentPart += word + ' ';
			}
		}

		if (currentPart.trim().length > 0) {
			parts.push(currentPart.trim());
		}

		return parts;
	}

	private sortQueue(): void {
		this.messageQueue.sort((a, b) => (a.priority !== b.priority ? b.priority - a.priority : a.timestamp - b.timestamp));
	}

	private processNextMessage(): void {
		if (this.messageQueue.length > 0) {
			try {
				const nextMessage = this.messageQueue.shift();
				if (nextMessage) {
					bot.sendMessageInGuildChat(nextMessage.content);
				}
			} catch (error) {
				logger.error('Failed to send message to Minecraft:', error);
				if (this.messageQueue.length < this.MAX_QUEUE_SIZE) {
					const failedMessage = this.messageQueue.shift();
					if (failedMessage) {
						failedMessage.priority = -1;
						this.messageQueue.push(failedMessage);
					}
				}
			}
		}
	}
}

const messageSender = new MessageSender();

export default messageSender;
