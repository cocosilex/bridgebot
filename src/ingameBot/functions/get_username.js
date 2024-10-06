module.exports = {
  getUsername: (message) => {
    let username;
    if (message.startsWith("message [")) {
      username = message.slice(message.indexOf("]") + 2,message.indexOf(" ", 16));
    } else {
      username = message.slice(8, message.indexOf(" ", 9));
    }
    return username
  },
};
