import { Events, Message } from 'discord.js';
import messageSender from '../ingameBot/MessageSender.js';

export const name = Events.MessageCreate;
export const once = false;
export async function execute(message: Message) {
    messageSender.send_message(message);
}
