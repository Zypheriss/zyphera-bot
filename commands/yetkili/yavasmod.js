const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "yavaşmod",
  execute(message, args) {
    if (!message.member.permissions.has("ManageChannels"))
      return message.reply("❌ Bu komutu kullanmak için **kanalları yönet** yetkisine sahip olmalısın.");

    const seconds = parseInt(args[0]);
    if (isNaN(seconds) || seconds < 0 || seconds > 21600)
      return message.reply("⏱️ Lütfen 0 ile 21600 saniye arasında geçerli bir sayı gir.");

    message.channel.setRateLimitPerUser(seconds).then(() => {
      const embed = new EmbedBuilder()
        .setTitle("⏳ Yavaş Mod Ayarlandı")
        .setDescription(`Bu kanalda artık her kullanıcı **${seconds} saniyede bir** mesaj atabilir.`)
        .setColor("Orange")
        .setFooter({ text: `İşlem yapan: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

      message.channel.send({ embeds: [embed] });
    }).catch(err => {
      message.reply("Bir hata oluştu.");
      console.error(err);
    });
  }
};
