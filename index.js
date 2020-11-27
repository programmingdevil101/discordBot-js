// setting environment variable
const dotenv = require('dotenv');
dotenv.config();


const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);

