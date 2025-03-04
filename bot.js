import { Client, Events, GatewayIntentBits } from "discord.js";
import { OpenAI } from "openai";

const TOKEN = process.env["DISCORD_BOT_TOKEN"];
const openai = new OpenAI({ apiKey: process.env["OPEN_AI_API_KEY"] });

//Global variables and constants
const LAZY_RATE_LIMITING = false;
const ASK_RATE_LIMITING = false;
const MESSAGE_FETCH_LIMIT = 100;
let rateLimitingTime = 0; //Ex : 2H or 30M
let blacklist = [];
let ignoredUsers = [];

//Intents
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

//Log message when bot is ready
client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);

  //TODO fetch blacklisted and ignored users
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  //TODO Accept argument to decide how many messages to summarize
  if (interaction.commandName === "lazy") {
    //Fetch messages and filters out commands and bot messages
    let allMessages = await interaction.channel.messages.fetch({
      limit: MESSAGE_FETCH_LIMIT,
    });

    let lastMessages = Array.from(allMessages.values()).filter(
      (message) => !message.author.bot && !message.content.startsWith("/"),
    );

    await interaction.deferReply();

    //Refactor and concatenate the messages authors and the channel's title
    let messagesString = "[CHANNEL NAME : " + interaction.channel.name + "]\n";
    lastMessages.reverse().map((message) => {
      messagesString +=
        "[" + message.author.username + "] " + message.content + "\n";
    });

    //OpenAI's API call for the summary
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content:
            'You are a helpful assistant that summarizes the last n number of messages from a discord channel for users who have been absent for a long time. You are provided with the channel name at the beginning of the transcript for you to have basic context. You are to provide useful information about topics discussed, questions, events, important topics or even debates in a concise way and in the form of bullet points. If the channel name or discussion revolves around programming, please provide relevant information such as updates, bugs, problems, changes, or questions that might be useful. When giving the summary, do not introduce the user with "A user named..." simply name them instead.',
        },
        {
          role: "user",
          content: messagesString,
        },
      ],
      store: false,
    });

    //console.log(completion.choices[0].message.content);

    //Return the summary
    //TODO CHOP THE MESSAGE (WHEN message.length > 2000) INTO MULTIPLE CHUNKS OF MESSAGES
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await interaction.followUp(completion.choices[0].message.content);
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
