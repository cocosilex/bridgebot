const { kick } = require("./events/guild_kick")
const { demote } = require("./events/guild_demote")
const { log_in } = require("./events/guild_log_in")
const { log_out } = require("./events/guild_log_out")
const { promote } = require("./events/guild_promote")
const { join } = require("./events/guild_join")
const { leave } = require("./events/guild_leave")
const { bridge } = require("./events/guild_message")

module.exports = {
    bridgeManager: async (message) => {
        if(message.startsWith("message Guild >") && message.includes(":")) { await bridge(message) }
        else if(message.startsWith("message Guild >") && message.endsWith("left.")) { await log_out(message) }
        else if(message.startsWith("message Guild >") && message.endsWith("joined.")) { await log_in(message) }
        else if(/\w{3,16} was promoted from/.test(message)  && ! message.includes(':')) { await promote(message) }
        else if(/\w{3,16} was demoted from/.test(message)  && ! message.includes(':')) { await demote(message) }
        else if(/\w{3,16} was kicked from the guild/.test(message)  && ! message.includes(':')) { await kick(message) }
        else if(/\w{3,16} joined the guild!/.test(message)  && ! message.includes(':')) { await join(message) }
        else if(/\w{3,16} left the guild!/.test(message)  && ! message.includes(':')) { await leave(message) }
    }
}