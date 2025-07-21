export const SETTINGS = {
    // min 1000, in ms
    autoReconnectToMinecraftCooldown: 3_000,
    // min 1, in seconds
    bridgeCooldown: 1,
    // define the maximum in queue waiting to be sent to the game, default : 1000
    maxMessagesInQueue: 1000,
    channels: {
        // You can set theses values in the .env file
        bridgeId: process.env.BRIDGE_CHANNEL_ID ?? '-1',
        logInOffId: process.env.LOG_IN_OFF_CHANNEL_ID ?? '-1',
        kickId: process.env.KICK_CHANNEL_ID ?? '-1',
        promoteDemoteId: process.env.PROMOTE_DEMOTE_CHANNEL_ID ?? '-1',
        leaveJoinId: process.env.LEAVE_JOIN_CHANNEL_ID ?? '-1',
        muteUnmuteId: process.env.MUTE_UNMUTE_CHANNEL_ID ?? '-1',
    },
    // If true, send embeds for guild messages on the bridge channel
    // If false, send plain text messages
    // DEFAULT : false
    sendEmbedsOrNotOnBridge: false,

    // true by default, send a notification when the app connects or disconnects from Hypixel
    // If false, it will not send any notification for connection status
    sendNotificationWhenBotLogInOff: true,
};
