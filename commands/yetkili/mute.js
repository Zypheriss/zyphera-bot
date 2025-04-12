const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Bir kullanıcıya zaman aşımı (mute) uygular.",
    async execute(message, args) {
        const target = message.mentions.members.first();
        if (!target) return message.reply("Lütfen mute atılacak kullanıcıyı etiketleyin!");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply("Bu komut için 'Üyeleri Zaman Aşımına Al' yetkisine ihtiyacım var!");
        }

        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply("Bu komutu kullanmak için 'Üyeleri Zaman Aşımına Al' yetkisine sahip olmalısınız!");
        }

        message.reply("Lütfen zaman aşımı süresini girin (örnek: `10m`, `2h`, `1d`):")
            .then(() => {
                const filter = (m) => m.author.id === message.author.id;
                const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 1 });

                collector.on("collect", async (msg) => {
                    const duration = msg.content;

                    const timeRegex = /^(\d+)([smhd])$/;
                    const match = duration.match(timeRegex);

                    if (!match) {
                        return message.reply("Geçersiz süre formatı! Süreyi `10m`, `2h`, veya `1d` formatında girin.");
                    }

                    const value = parseInt(match[1]);
                    const unit = match[2];
                    let milliseconds;

                    switch (unit) {
                        case "s": milliseconds = value * 1000; break;       // Saniye
                        case "m": milliseconds = value * 60 * 1000; break; // Dakika
                        case "h": milliseconds = value * 60 * 60 * 1000; break; // Saat
                        case "d": milliseconds = value * 24 * 60 * 60 * 1000; break; // Gün
                        default: return message.reply("Geçersiz süre formatı!");
                    }

                    if (milliseconds > 28 * 24 * 60 * 60 * 1000) {
                        return message.reply("Zaman aşımı süresi maksimum 28 gün olabilir!");
                    }

                    try {
                        await target.timeout(milliseconds, `Zaman aşımı atan kişi: ${message.author.tag}`);
                        message.reply(`${target.user.tag} kullanıcısına ${duration} süreyle zaman aşımı uygulandı.`);
                    } catch (error) {
                        console.error(error);
                        message.reply("Zaman aşımı uygulanırken bir hata oluştu.");
                    }
                });

                collector.on("end", (collected) => {
                    if (collected.size === 0) {
                        message.reply("Zaman aşımı süresi belirtilmedi, işlem iptal edildi.");
                    }
                });
            });
    },
};
