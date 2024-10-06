const { Client } = require("discord.js");
const SETTINGS = require("./settings.js")
const fs = require("node:fs");
const path = require("node:path");

let client;
const discordBotTimeout = 30_000;

function reconnectClient() {
  console.log("[PROCESS} Trying to reconnect discord bot in 30s...");
  setTimeout(() => {
    createClient();
  },discordBotTimeout);
}

function connect() {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  client.login(SETTINGS.discordToken);
}

function createClient() {
  try {
    client = new Client({ intents: 3276799 });
    client.connect = connect;
  } catch (err) {
    console.warn(
      `[WARNING] There was an error when trying to connect to discord`
    );
    reconnectClient();
  }
}

createClient();

module.exports = client;
