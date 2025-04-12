module.exports = {
    name: 'kick',
    description: 'Bir kullanıcıyı sunucudan atar.',
    async execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        const user = message.mentions.members.first();
        if (!user) {
            return message.reply('Atmak için bir kullanıcı etiketleyin.');
        }

        if (user === message.member) {
            return message.reply('Kendinizi atamazsınız!');
        }

        await user.kick();
        message.reply(`${user.user.tag} başarıyla sunucudan atıldı.`);
    },
};
