import client from "./utils/client.js";
import messageSender from "./ingameBot/messageSender.js";
import checkAllVariables from "./utils/functions/checkAllVariables.js";

checkAllVariables();
client.connect();
messageSender.bridgeInit();
