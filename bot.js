import { Client, Events, GatewayIntentBits } from "discord.js";

const TOKEN = process.env["DISCORD_BOT_TOKEN"];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "lazy") {
    await interaction.reply("[LOG] This is a test log.");
  }
});

client.login(TOKEN);
