module.exports = {
    name: 'invite',
    description: 'Botu sunucuya davet etmek için bir bağlantı gönderir.',
    execute(message) {
        message.reply('Botu davet etmek için şu bağlantıyı kullanabilirsiniz: https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=YOUR_PERMISSIONS');
    },
};
