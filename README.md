# ImSoLazyBot

## A fully functional discord bot that allows you to get a quick and precise summary of messages you don't feel like going through using OpenAI's API.

<img src="./img/DiscordBot.png" alt="Bot's logo" align="right" width="20%" height="20%">

This project is a discord bot that utilizes OpenAI's API to generate a summary of all the lastest messages on
a discord channel. The summary is presented using bullet points to keep things short and clear.
<br />Primarely designed to get updates on a programming project that me and some friends are currently working on,
this bot works great to for casual and light-hearted conversations too !
<br />ImSoLazyBot implements the following features : 

* Generate a summary of the last n number of messages.

[FEATURES COMING SOON]
* Ask a question to ChatGPT directly from the discord server.
* Prevent a user from using the bot.
* Exclude all messages from  specific users to be used for the summary.
* Rate limit the requests for the summary generation.

<p align="center">
 <img src="./img/Summary example.png"
   alt="Summary example" width="80%" heigth="80%">
</p>

# Commands
* /lazy > Generates a summary of the last n messages.
* /ask > Prompt a question to ChatGPT directly from the discord app.
* /blacklist [USERNAME] > Prevents a user from using the bot and adds them to the blacklist.
* /whitelist [USERNAME] > Removes a user from the blacklist.
* /ignore [USERNAME] > Excludes all messages from a specific user when generating the summary.
* /unignore [USERNAME] > Removes a user from the ignored users list.
* /ratelimit [TIME] [M/H] > Rate limit the usage of commands such as /lazy and /ask.
  * Can only be used by the bot's administrator.
  * The user specify the time in minutes or hours (ex: /ratelimit 30 M or /ratelimit 2 H).
  * Normal users can only use the default /ratelimit command that returns the time left before /lazy and /ask are available again.
  
# Limitations
ImSoLazyBot was designed to be used on a small number of discord servers. Some functionnalities might not work properly
if used on multiple servers at the same time.

# How to use
This project is hosted using [Replit](https://replit.com/) but feel free to host any way you want. Small tweaks to the code must be done
regarding the secrets if hosted by different means. A .env_example is provided in the repository.

# License
This project is licensed under the [MIT License](./LICENSE).

# Liked the project ? 
Follow me here : <br />
[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/in/eric-marin-mejia-653317289/) 
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/EricMarinMejia)

<!-- Feeling generous ? You can buy me a coffee here : -->


