module.exports = {
    name: 'avatar',
    description: 'Kullanıcının profil resmini gösterir.',
    execute(message) {
        const user = message.mentions.users.first() || message.author;
        message.reply(`${user.tag}'ın profil resmi: ${user.displayAvatarURL({ dynamic: true, size: 512 })}`);
    },
};
