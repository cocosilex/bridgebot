module.exports = {
    getWebHook: async (channel) => {
        try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find((wh) => wh.token);
        return webhook
        } catch (error) {
            console.error('Error trying to send a message: ', error);
        }
    }
}