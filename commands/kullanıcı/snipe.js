module.exports = {
    name: "snipe",
    execute(message) {
      const sniped = message.client.snipes?.get(message.channel.id);
      if (!sniped) return message.reply("Bu kanalda yakın zamanda silinen bir mesaj yok.");
  
      message.channel.send({
        content: `💬 **Silinen Mesaj:** ${sniped.content}\n👤 **Yazan:** ${sniped.author.tag}\n🕒 **Zaman:** <t:${Math.floor(sniped.createdAt / 1000)}:R>`
      });
    }
  };
  