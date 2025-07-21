import { EmbedBuilder, TextChannel } from 'discord.js';
import { SETTINGS } from '../../utils/settings.js';
import client from '../../utils/client.js';
import getUsernameAndRank from '../../utils/functions/getUsernameAndRank.js';

export default async function mute(message: string): Promise<void> {
    if (SETTINGS.channels.muteUnmuteId === '-1') return;
    const muteEmbed = new EmbedBuilder()
        .setAuthor({
            name: 'Member Muted',
            iconURL: `https://mc-heads.net/avatar/${getUsernameAndRank(message).username}`,
        })
        .setColor(0xff0000)
        .setDescription(message);
    const channel = client.channels.cache.get(SETTINGS.channels.muteUnmuteId);
    if (channel instanceof TextChannel) {
        await channel.send({ embeds: [muteEmbed] });
    }
}
