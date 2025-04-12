const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "sunucuresmi",
  execute(message) {
    const guild = message.guild;
    const icon = guild.iconURL({ dynamic: true, size: 4096 });

    if (!icon) return message.reply("demiyim demiyim diyorumda benle T2şak mı geçiyon sunucuna Resim ekle.");

    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} Sunucu Resmi`)
      .setImage(icon)
      .setColor("yellow")
      .setFooter({ text: `Sunucu ID: ${guild.id}` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Normal boyutu aç")
        .setStyle(ButtonStyle.Link)
        .setURL(icon)
    );

    message.channel.send({ embeds: [embed], components: [row] });
  },
};
