module.exports = {
    name: 'ping',
    description: 'Botun yanıt süresini gösterir.',
    execute(message) {
        message.reply(`Pong! \`${Date.now() - message.createdTimestamp}ms\``);
    },
};
