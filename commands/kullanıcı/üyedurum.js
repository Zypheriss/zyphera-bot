module.exports = {
    name: "üyedurum",
    execute(message) {
      const members = message.guild.members.cache;
      const online = members.filter(m => m.presence?.status === "online").size;
      const idle = members.filter(m => m.presence?.status === "idle").size;
      const dnd = members.filter(m => m.presence?.status === "dnd").size;
      const offline = members.filter(m => !m.presence || m.presence.status === "offline").size;
  
      message.channel.send(
        `👥 **Üye Durumları:**\n🟢 Çevrimiçi: ${online}\n🌙 Boşta: ${idle}\n⛔ Rahatsız Etmeyin: ${dnd}\n⚫ Çevrimdışı: ${offline}`
      );
    }
  };
  