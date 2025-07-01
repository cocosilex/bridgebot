import { EmbedBuilder, TextChannel } from 'discord.js';
import client from '../../utils/client.js';
import { SETTINGS } from '../../utils/settings.js';
import getUsername from '../../utils/functions/getUsername.js';

export default async function kick(message: string): Promise<void> {
	if (SETTINGS.channels.kickId === '-1') return;
	const kickEmbed = new EmbedBuilder()
		.setAuthor({
			name: 'Member Kicked',
			iconURL: `https://mc-heads.net/avatar/${getUsername(message)}`,
		})
		.setColor(0xff0000)
		.setDescription(message);
	const channel = client.channels.cache.get(SETTINGS.channels.kickId);
	if (channel instanceof TextChannel) {
		await channel.send({ embeds: [kickEmbed] });
	}
}
