module.exports = {
    name: "temizle",
    description: "Belirtilen sayıda mesajı siler.",
    async execute(message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send("Bu komutu kullanmak için `Mesajları Yönet` yetkisine sahip olmalısın!");
        }

        const sayı = parseInt(args[0]);
        if (!sayı || sayı < 1 || sayı > 100) {
            return message.channel.send("Lütfen 1 ile 100 arasında bir sayı belirt!");
        }

        try {
            const deletedMessages = await message.channel.bulkDelete(sayı, true);
            message.channel
                .send(`✅ ${deletedMessages.size} mesaj başarıyla silindi.`)
                .then((msg) => setTimeout(() => msg.delete(), 5000)); 
        } catch (error) {
            console.error(error);
            message.channel.send("Mesajları silerken bir hata oluştu.");
        }
    },
};
