import { Events, Message } from 'discord.js';
import MessageSender from '../ingameBot/MessageSender.js';

export const name = Events.MessageCreate;
export const once = false;
export async function execute(message: Message) {
    MessageSender.getInstance().send_message(message);
}
