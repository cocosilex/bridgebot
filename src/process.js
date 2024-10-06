process.on('unhandledRejection', error => {
    console.error(`[WARNING] Unhandled promise rejection: ${error}`);
    console.error(error)
});

process.on('uncaughtException', error => {
    console.error(`[WARNING] Uncaught exception: ${error}`);
    console.error(error)
});