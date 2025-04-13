export const SETTINGS = {
  // min 1000, in ms
  autoReconnectToMinecraftCooldown: 3_000,
  // min 1, in seconds
  bridgeCooldown: 1,
  // define the maximum in queue waiting to be sent to the game, default : 1000
  maxMessagesInQueue: 1000,
  channels: {
    // You can set the value to '-1' if you want to disable the feature
    bridgeId: "",
    logInOffId: "",
    kickId: "",
    promoteDemoteId: "",
    leaveJoinId: "",
  },
};
