import { EmbedBuilder, TextChannel } from 'discord.js';
import client from '../../utils/client.js';
import { SETTINGS } from '../../utils/settings.js';
import getUsernameAndRank from '../../utils/functions/getUsernameAndRank.js';

export default async function join(message: string): Promise<void> {
    if (SETTINGS.channels.leaveJoinId === '-1') return;
    const joinEmbed = new EmbedBuilder()
        .setAuthor({
            name: 'Member Joined',
            iconURL: `https://mc-heads.net/avatar/${getUsernameAndRank(message).username}`,
        })
        .setColor(0x008000)
        .setDescription(message);
    const channel = client.channels.cache.get(SETTINGS.channels.leaveJoinId);
    if (channel instanceof TextChannel) {
        await channel.send({ embeds: [joinEmbed] });
    }
}
