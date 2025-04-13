import { EmbedBuilder, TextChannel } from "discord.js";
import client from "../../utils/client.js";
import { SETTINGS } from "../../utils/settings.js";
import getUsername from "../../utils/functions/getUsername.js";

export default async function promote(message: string): Promise<void> {
  if (SETTINGS.channels.promoteDemoteId === "-1") return;
  const promoteEmbed = new EmbedBuilder()
    .setAuthor({
      name: "Member Promoted",
      iconURL: `https://mc-heads.net/avatar/${getUsername(message)}`,
    })
    .setColor(0x008000)
    .setDescription(message);
  const channel = client.channels.cache.get(SETTINGS.channels.promoteDemoteId);
  if (channel instanceof TextChannel) {
    await channel.send({ embeds: [promoteEmbed] });
  }
}
