import { EmbedBuilder, TextChannel } from 'discord.js';
import client from '../../utils/client.js';
import { SETTINGS } from '../../utils/settings.js';
import getUsernameAndRank from '../../utils/functions/getUsernameAndRank.js';

export default async function demote(message: string): Promise<void> {
    if (SETTINGS.channels.promoteDemoteId === '-1') return;
    const demoteEmbed = new EmbedBuilder()
        .setAuthor({
            name: 'Member Demoted',
            iconURL: `https://mc-heads.net/avatar/${getUsernameAndRank(message).username}`,
        })
        .setColor(0xff0000)
        .setDescription(message);
    const channel = client.channels.cache.get(SETTINGS.channels.promoteDemoteId);
    if (channel instanceof TextChannel) {
        await channel.send({ embeds: [demoteEmbed] });
    }
}
