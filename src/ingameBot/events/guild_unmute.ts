import { EmbedBuilder, TextChannel } from 'discord.js';
import { SETTINGS } from '../../utils/settings.js';
import getUsernameAndRank from '../../utils/functions/getUsernameAndRank.js';
import client from '../../utils/client.js';

export default async function unmute(message: string): Promise<void> {
    if (SETTINGS.channels.muteUnmuteId === '-1') return;
    const unmuteEmbed = new EmbedBuilder()
        .setAuthor({
            name: 'Member Unmuted',
            iconURL: `https://mc-heads.net/avatar/${getUsernameAndRank(message).username}`,
        })
        .setColor(0x008000)
        .setDescription(message);
    const channel = client.channels.cache.get(SETTINGS.channels.muteUnmuteId);
    if (channel instanceof TextChannel) {
        await channel.send({ embeds: [unmuteEmbed] });
    }
}
