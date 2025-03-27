import { REST, Routes } from "discord.js";

const TOKEN = process.env["DISCORD_BOT_TOKEN"];
const CLIENT_ID = process.env["CLIENT_ID"];

/*Needs to run everytime we add or delete a command. 
  I also can't seem to update the bot unless kicked and re-added
  to the discord server.

  To rerun: Change "main" and "entrypoint" to "index.js" inside
  package.json and .replit file
*/
const commands = [
  {
    name: "lazy",
    description: "Get a summary of the last 100 messages.",
  },
  {
    name: "ask",
    description: "Ask ChatGPT a question.",
    options: [
      {
        name: "question",
        description: "The question to ask ChatGPT.",
        type: 3,
        required: true,
      },
    ],
  },
];

// Token stored inside Replit's Secrets tool but you can also use a .env file. A .env_example file is provided in the repository.
const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
