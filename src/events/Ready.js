const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[SUCCESS] Logged in discord as ${client.user.tag} !`);
  },
};
