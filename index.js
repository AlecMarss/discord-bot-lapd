require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_TOKEN;

// Registro de comandos slash
const commands = [
    new SlashCommandBuilder()
        .setName('placa')
        .setDescription('Genera un número de 4 dígitos aleatorio para la placa policial'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', async () => {
    console.log('¡El bot está en línea!');

    try {
        console.log('Actualizando comandos (/) de la aplicación.');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('Comandos (/) de la aplicación actualizados con éxito.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'placa') {
        const randomPlaca = Math.floor(1000 + Math.random() * 9000);
        await interaction.reply(`Tu placa policial es: ${randomPlaca}`);
    }
});

client.login(token);
