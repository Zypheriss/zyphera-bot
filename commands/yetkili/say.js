const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "say",
  execute(message) {
    const guild = message.guild;
    const members = guild.members.cache;

    const total = members.size;
    const bots = members.filter(m => m.user.bot).size;
    const online = members.filter(m => m.presence?.status === "online").size;

    const embed = new EmbedBuilder()
      .setTitle("📊 Sunucu İstatistikleri")
      .setColor("Green")
      .addFields(
        { name: "👥 Toplam Üye", value: `${total}`, inline: true },
        { name: "🤖 Botlar", value: `${bots}`, inline: true },
        { name: "🟢 Çevrimiçi", value: `${online}`, inline: true },
      )
      .setFooter({ text: `Sunucu: ${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) });

    message.channel.send({ embeds: [embed] });
  }
};
