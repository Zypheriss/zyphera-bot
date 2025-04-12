module.exports = {
    name: 'ban',
    description: 'Bir kullanıcıyı yasaklar.',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        const user = message.mentions.members.first();
        if (!user) {
            return message.reply('Yasaklamak için bir kullanıcı etiketleyin.');
        }

        if (user === message.member) {
            return message.reply('Kendinizi yasaklayamazsınız!');
        }

        await user.ban();
        message.reply(`${user.user.tag} başarıyla yasaklandı.`);
    },
};
