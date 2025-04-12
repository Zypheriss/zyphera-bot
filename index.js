const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences, 
    ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(path.join(folderPath, file));
        if (command.name) {
            client.commands.set(command.name, command);
        }
    }
}

client.once("ready", () => {
    console.log(`Bot başarılı bir şekilde giriş yaptı: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Bu komutu çalıştırırken bir hata oluştu!");
    }
});
client.on("messageDelete", (message) => {
    if (message.partial || message.author?.bot) return;

    const snipes = client.snipes || new Map();
    snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        createdAt: message.createdAt
    });

    client.snipes = snipes;
});

// Botu çalıştırma
client.login(config.token);
