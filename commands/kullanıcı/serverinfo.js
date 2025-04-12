const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment/locale/tr');  // Moment.js için Türkçe dil desteği

module.exports = {
    name: 'serverinfo',
    description: 'Sunucu bilgilerini gösterir.',
    async execute(message) {
        const guild = message.guild;

        moment.locale('tr');
        const createdAt = moment(guild.createdAt).format('LL');

        const boosts = guild.premiumSubscriptionCount;
        const boostLevel = guild.premiumTier;
        const totalChannels = guild.channels.cache.size;

        const embed = new EmbedBuilder()
            .setTitle(`${guild.name} Sunucu Bilgileri`)
            .setColor('#ff0000')
            .addFields(
                { name: 'Sunucu Adı', value: guild.name },
                { name: 'Sunucu Sahibi', value: `<@${guild.ownerId}>` },
                { name: 'Sunucu Kuruluş Tarihi', value: createdAt },
                { name: 'Toplam Üye Sayısı', value: guild.memberCount.toString() },
                { name: 'Toplam Kanal Sayısı', value: totalChannels.toString() },
                { name: 'Sunucu Boost Sayısı', value: boosts.toString() },
                { name: 'Boost Seviyesi', value: boostLevel === 1 ? '1. Seviye' : boostLevel === 2 ? '2. Seviye' : boostLevel === 3 ? '3. Seviye' : 'Yok' }
            )
            .setThumbnail(guild.iconURL())
            .setImage(guild.iconURL({ dynamic: true, size: 1024 }));

        message.channel.send({ embeds: [embed] });
    },
};
