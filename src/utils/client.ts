import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

class ExtendedClient extends Client {
	connect: () => void;

	constructor() {
		super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
		this.connect = () => {
			const __filename = fileURLToPath(import.meta.url);
			const __dirname = path.dirname(__filename);
			const eventsPath = path.join(__dirname, '..', 'events');

			const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
			for (const file of eventFiles) {
				const filePath = path.join(eventsPath, file);
				import(filePath).then((event) => {
					if (event.once) {
						this.once(event.name, (...args) => event.execute(...args));
					} else {
						this.on(event.name, (...args) => event.execute(...args));
					}
				});
			}

			this.login(process.env.DISCORD_TOKEN);
		};
	}
}

const client = new ExtendedClient();

export default client;
