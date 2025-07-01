import { EmbedBuilder, TextChannel } from 'discord.js';
import client from '../../utils/client.js';
import { SETTINGS } from '../../utils/settings.js';
import getWebHook from '../../utils/functions/getWebhook.js';

export default async function log_out(message: string): Promise<void> {
	if (SETTINGS.channels.logInOffId === '-1') return;
	const logOutEmbed = new EmbedBuilder().setColor(0xff0000).setDescription(message.slice(8, message.length));

	const channel = client.channels.cache.get(SETTINGS.channels.logInOffId);
	if (channel instanceof TextChannel) {
		const webhook = await getWebHook(channel);
		if (webhook) {
			await webhook.send({
				embeds: [logOutEmbed],
				username: `${message.slice(16, message.indexOf(' ', 8))}`,
				avatarURL: `https://mc-heads.net/avatar/${message.slice(8, message.indexOf(' ', 8))}`,
			});
		} else {
			await channel.send('Webhook not found');
		}
	}
}
