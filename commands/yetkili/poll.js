module.exports = {
    name: 'poll',
    description: 'Bir anket başlatır.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        const question = args.join(' ');
        if (!question) {
            return message.reply('Anket sorusunu belirtmeniz gerekir.');
        }

        const pollEmbed = {
            color: 0x0099ff,
            title: 'Yeni Anket!',
            description: question,
            fields: [
                {
                    name: 'Cevaplar',
                    value: '👍 - Evet\n👎 - Hayır',
                },
            ],
        };

        const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
        await pollMessage.react('👍');
        await pollMessage.react('👎');
    },
};
