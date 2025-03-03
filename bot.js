import { Client, Events, GatewayIntentBits } from "discord.js";

const TOKEN = process.env["DISCORD_BOT_TOKEN"];

//Global variables and constants
const RATE_LIMITING = false;
let rateLimitingTime = 0; //Ex : 2H or 30M
let blacklist = [];

//Intents
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

//Log message when bot is ready
client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);

  //TODO fetch blacklisted users
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  //TODO Accept argument to decide how many messages to summarize
  if (interaction.commandName === "lazy") {
    //Fetch last 100 messages and filter them
    let lastMessages = await interaction.channel.messages.fetch({ limit: 5 });

    lastMessages = lastMessages.filter(
      (message) => !message.author.bot && !message.content.startsWith("/"),
    );

    //Refactor and concatenate the messages authors for ChatGPT
    let messagesString = "";

    lastMessages.reverse().map((message) => {
      messagesString +=
        "[" + message.author.username + "] " + message.content + "\n";
    });

    await interaction.reply(`Last 5 messages:\n${messagesString}`);

    //TODO Call ChatGPT API and pass it down some context for the summary
  }

  /*
  /blacklist [USERNAME]
  TODO add a /blacklist command to prevent a user from using the bot.
  Store that user in a db and fetch it everytime the bot goes online to a local        Array. The commands from the blacklisted users will not be executed.
  */

  /*
  /whitelist [USERNAME]
  TODO add a /whitelist command to remove a user from the blacklist.
  */

  /*
  /ignore [USERNAME]
  TODO add a /ignore command to signal the bot to ignore all messages from a           specific user.
  */

  /*
  /unignore [USERNAME]
  TODO add a /unignore command to signal the bot to stop ignoring messages from a      specific user.
  */

  /*
  /ratelimit [ON/OFF] [TIME] [M (MINUTES)/H (HOURS)]
  TODO add a /ratelimit command to rate limit /lazy commands. If on, the bot will 
  create a timestamp when summoned with /lazy. If summoned again, it will check if
  the timestamp is within the rate limiting time. If not, it will return a summary.
  ex : /ratelimit ON
  ex : /ratelimit OFF

  If turnned on. The default will be once per 30 min.

  You can also specify an amount of time you want the bot to be rate limited.
  ex : /ratelimit ON 2 H
  ex : /ratelimit ON 30 M

  If no parameter is specified, the bot will tell the time left before it can be
  summoned again.
  ex : /ratelimit => "You can summon /lazy again in 2 hours and 30 minutes.""
  */
});

client.login(TOKEN);
