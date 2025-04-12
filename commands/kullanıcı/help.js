const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'Komutları kategorilere göre gösterir.',
    async execute(message) {
        const userCommands = [];
        const adminCommands = [];

        const userCommandsFolder = path.join(__dirname, '../kullanıcı');
        const adminCommandsFolder = path.join(__dirname, '../yetkili');

        fs.readdirSync(userCommandsFolder).forEach((file) => {
            if (file.endsWith('.js')) {
                const command = require(path.join(userCommandsFolder, file));
                userCommands.push(command.name);
            }
        });

        fs.readdirSync(adminCommandsFolder).forEach((file) => {
            if (file.endsWith('.js')) {
                const command = require(path.join(adminCommandsFolder, file));
                adminCommands.push(command.name);
            }
        });

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('help_category')
                .setPlaceholder('Bir kategori seçin')
                .addOptions(
                    {
                        label: 'Kullanıcı Komutları',
                        value: 'user',
                        description: 'Kullanıcı komutlarını görüntüle.',
                    },
                    {
                        label: 'Yetkili Komutları',
                        value: 'admin',
                        description: 'Yetkili komutlarını görüntüle.',
                    }
                )
        );

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('Komut Yardım Menüsü')
            .setDescription('Bir kategori seçmek için menüyü kullanın:');

        const replyMessage = await message.reply({
            embeds: [embed],
            components: [row],
        });

        const collector = replyMessage.createMessageComponentCollector({ time: 15000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'help_category') {
                const selectedCategory = interaction.values[0];
                let categoryEmbed = new EmbedBuilder()
                    .setColor('#3498db')
                    .setTitle(
                        selectedCategory === 'user' ? 'Kullanıcı Komutları' : 'Yetkili Komutları'
                    )
                    .setDescription(
                        selectedCategory === 'user'
                            ? userCommands.join(', ')
                            : adminCommands.join(', ')
                    );

                await interaction.update({
                    embeds: [categoryEmbed],
                    components: [],
                });
            }
        });

        collector.on('end', async () => {
            if (replyMessage.editable) {
                await replyMessage.edit({ components: [] });
            }
        });
    },
};
