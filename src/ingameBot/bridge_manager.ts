import kick from './events/guild_kick.js';
import demote from './events/guild_demote.js';
import log_in from './events/guild_log_in.js';
import log_out from './events/guild_log_out.js';
import promote from './events/guild_promote.js';
import join from './events/guild_join.js';
import leave from './events/guild_leave.js';
import bridge from './events/guild_message.js';
import unmute from './events/guild_unmute.js';
import mute from './events/guild_mute.js';

export default async function bridgeManager(message: string): Promise<void> {
    if (message.startsWith('Guild >') && message.includes(':')) {
        await bridge(message);
    } else if (message.startsWith('Guild >') && message.endsWith('left.')) {
        await log_out(message);
    } else if (message.startsWith('Guild >') && message.endsWith('joined.')) {
        await log_in(message);
    } else if (/\w{3,16} was promoted from/.test(message) && !message.includes(':')) {
        await promote(message);
    } else if (/\w{3,16} was demoted from/.test(message) && !message.includes(':')) {
        await demote(message);
    } else if (/\w{3,16} was kicked from the guild/.test(message) && !message.includes(':')) {
        await kick(message);
    } else if (/\w{3,16} joined the guild!/.test(message) && !message.includes(':')) {
        await join(message);
    } else if (/\w{3,16} left the guild!/.test(message) && !message.includes(':')) {
        await leave(message);
    } else if (/\w{3,16} has unmuted/.test(message) && !message.includes(':')) {
        await unmute(message);
    } else if (/\w{3,16} has muted/.test(message) && !message.includes(':')) {
        await mute(message);
    }
}
