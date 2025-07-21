import client from '../../utils/client.js';
import { SETTINGS } from '../../utils/settings.js';
import getWebHook from '../../utils/functions/getWebhook.js';
import { ColorResolvable, EmbedBuilder, TextChannel } from 'discord.js';
import MinecraftBot from '../MinecraftBot.js';
import getUsernameAndRank from '../../utils/functions/getUsernameAndRank.js';

export default async function bridge(message: string): Promise<void> {
    if (SETTINGS.channels.bridgeId === '-1') return;
    const playerNameAndRank = getUsernameAndRank(message.slice(8, message.indexOf(':')));
    const messageContent = message.slice(message.indexOf(':') + 2, message.length);

    const minecraftBot = MinecraftBot.getInstance();
    if (playerNameAndRank.username === minecraftBot.getUsername()) return;

    const truncedMessage = messageContent.replaceAll('`', '');
    const channel = client.channels.cache.get(SETTINGS.channels.bridgeId);
    if (channel instanceof TextChannel) {
        const webhook = await getWebHook(channel);

        if (webhook) {
            if (!SETTINGS.sendEmbedsOrNotOnBridge) {
                await webhook.send({
                    content: `\`${truncedMessage}\``,
                    username: `${playerNameAndRank.username}`,
                    avatarURL: `https://mc-heads.net/avatar/${playerNameAndRank.username}`,
                });
            } else {
                let embedColor = '#AAAAAA';
                switch (playerNameAndRank.rank) {
                    case 'YOUTUBE':
                        embedColor = '#FF5555';
                        break;
                    case 'MVP++':
                        embedColor = '#FFAA00';
                        break;
                    case 'MVP+':
                        embedColor = '#0ca3e8';
                        break;
                    case 'MVP':
                        embedColor = '#19f9f1';
                        break;
                    case 'VIP+':
                        embedColor = '#22a129';
                        break;
                    case 'VIP':
                        embedColor = '#1ce300';
                        break;
                }

                const messageEmbed = new EmbedBuilder().setColor(embedColor as ColorResolvable).setDescription(`${truncedMessage}`);

                await webhook.send({
                    embeds: [messageEmbed],
                    username: `${playerNameAndRank.username}`,
                    avatarURL: `https://mc-heads.net/avatar/${playerNameAndRank.username}`,
                });
            }
        }
    }
}
