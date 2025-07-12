import client from '../../utils/client.js';
import { SETTINGS } from '../../utils/settings.js';
import getWebHook from '../../utils/functions/getWebhook.js';
import { EmbedBuilder, TextChannel } from 'discord.js';
import minecraftBot from '../minecraftBot.js';

export default async function bridge(message: string): Promise<void> {
	if (SETTINGS.channels.bridgeId === '-1') return;
	const informationsAboutSender = message.slice(0, message.indexOf(':'));
	const messageContent = message.slice(message.indexOf(':') + 2, message.length);

	let playerName;
	if (informationsAboutSender.endsWith(']')) {
		playerName = informationsAboutSender.slice(
			informationsAboutSender.lastIndexOf(' ', informationsAboutSender.lastIndexOf(' ') - 1) + 1,
			informationsAboutSender.lastIndexOf(' ')
		);
	} else {
		playerName = informationsAboutSender.slice(informationsAboutSender.lastIndexOf(' ') + 1, informationsAboutSender.length);
	}

	if (playerName === minecraftBot.getUsername()) return;

	const truncedMessage = messageContent.replaceAll('`', '');
	const channel = client.channels.cache.get(SETTINGS.channels.bridgeId);
	if (channel instanceof TextChannel) {
		const webhook = await getWebHook(channel);

		if (webhook) {
			if (!SETTINGS.sendEmbedsOrNotOnBridge) {
				await webhook.send({
					content: `\`${truncedMessage}\``,
					username: `${playerName}`,
					avatarURL: `https://mc-heads.net/avatar/${playerName}`,
				});
			} else {
				const messageEmbed = new EmbedBuilder().setColor('#55ffff').setDescription(`${truncedMessage}`);

				await webhook.send({
					embeds: [messageEmbed],
					username: `${playerName}`,
					avatarURL: `https://mc-heads.net/avatar/${playerName}`,
				});
			}
		}
	}
}
