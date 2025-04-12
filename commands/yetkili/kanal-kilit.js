const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "kanal-kilit",
  async execute(message) {
    if (!message.member.permissions.has("ManageChannels"))
      return message.reply("❌ Bu komutu kullanmak için **kanalları yönet** yetkisine sahip olmalısın.");

    const everyoneRole = message.guild.roles.everyone;
    const channel = message.channel;
    const permissionOverwrites = channel.permissionOverwrites.cache.get(everyoneRole.id);

    const isLocked = permissionOverwrites?.deny.has("SendMessages");

    const newState = !isLocked;

    await channel.permissionOverwrites.edit(everyoneRole, {
      SendMessages: newState ? false : null
    });

    const embed = new EmbedBuilder()
      .setTitle(newState ? "🔒 Kanal Kilitlendi" : "🔓 Kanal Açıldı")
      .setDescription(newState
        ? "Bu kanalda artık kimse mesaj gönderemez."
        : "Kanal tekrar mesajlara açıldı.")
      .setColor(newState ? "Red" : "Green")
      .setFooter({ text: `İşlem yapan: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(newState ? "Kilit Aç" : "Kilit Kapat")
        .setCustomId("toggleLock")
        .setStyle(newState ? ButtonStyle.Success : ButtonStyle.Danger)
    );

    const msg = await channel.send({ embeds: [embed], components: [row] });

    const collector = msg.createMessageComponentCollector({
      filter: (i) => i.customId === "toggleLock" && i.member.permissions.has("ManageChannels"),
      time: 60_000
    });

    collector.on("collect", async (i) => {
      const isLockedNow = channel.permissionOverwrites.cache.get(everyoneRole.id)?.deny.has("SendMessages");

      await channel.permissionOverwrites.edit(everyoneRole, {
        SendMessages: isLockedNow ? null : false
      });

      const newEmbed = EmbedBuilder.from(embed)
        .setTitle(isLockedNow ? "🔓 Kanal Açıldı" : "🔒 Kanal Kilitlendi")
        .setDescription(isLockedNow
          ? "Kanal tekrar mesajlara açıldı."
          : "Bu kanalda artık kimse mesaj gönderemez.")
        .setColor(isLockedNow ? "Green" : "Red");

      const newButton = new ButtonBuilder()
        .setLabel(isLockedNow ? "Kilit Kapat" : "Kilit Aç")
        .setCustomId("toggleLock")
        .setStyle(isLockedNow ? ButtonStyle.Danger : ButtonStyle.Success);

      await i.update({ embeds: [newEmbed], components: [new ActionRowBuilder().addComponents(newButton)] });
    });
  }
};
