const SETTINGS = {
    discordToken:"",
    // min 1000, in ms
    autoReconnectToMinecraftCooldown:3_000,
    // min 1, in seconds
    bridgeCooldown:1,
    minecraftAccount: {
        pseudo:"",
        email:"",
        password:"",
    },
    channels: {
        bridgeId:'',
        logInOffId:'',
        kickId:'',
        promoteDemoteId:'',
        leaveJoinId:'',
    }
};

module.exports = SETTINGS;