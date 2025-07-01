import client from "./utils/client.js";
import messageSender from "./ingameBot/messageSender.js";

client.connect();
messageSender.bridgeInit();
