const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Bir kullanıcının bilgilerini gösterir.",
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        const statusMap = {
            online: "Çevrimiçi",
            idle: "Boşta",
            dnd: "Rahatsız Etmeyin",
            offline: "Çevrimdışı",
        };

        const status = statusMap[member?.presence?.status] || "Bilinmiyor";

        const createdAt = new Intl.DateTimeFormat("tr-TR", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(user.createdAt);

        const joinedAt = new Intl.DateTimeFormat("tr-TR", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(member?.joinedAt || Date.now());

        const nitroStatus = user.displayAvatarURL({ dynamic: true }).includes("gif")
            ? "Evet (Nitro aktif)"
            : "Hayır";

        const roles = member?.roles.cache
            .filter((role) => role.id !== message.guild.id)
            .map((role) => role.name)
            .join(", ") || "Rolleri yok";

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTitle(`${user.username} Bilgileri`)
            .addFields(
                { name: "Kullanıcı ID", value: user.id, inline: true },
                { name: "Kullanıcı Adı", value: user.tag, inline: true },
                { name: "Durum", value: status, inline: true },
                { name: "Hesap Oluşturulma Tarihi", value: createdAt, inline: true },
                { name: "Sunucuya Katılma Tarihi", value: joinedAt, inline: true },
                { name: "Nitro Aboneliği", value: nitroStatus, offlien: true },
                { name: "Roller", values: roles }
            );

        message.channel.send({ embeds: [embed] });
    },
};
