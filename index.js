// setting environment variable
const dotenv = require('dotenv');
dotenv.config();
// config file
const { prefix } = require('./config.json');


const { swearWords } = require('./array.json');


const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

client.login(process.env.DISCORD_TOKEN);

const cooldowns = new Discord.Collection();

client.on('ready', () =>{
    console.log(`Logged on as ${client.user.tag}!`)
});

client.on('message', (message, guild) =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(!command) return;
    
    if(command.args && !args.length){
        reply = message.author.reply("You didn't provide any arguments!");
        
        if(command.usage){
            reply += `\nThe proper usage would be: ${prefix}${command.name} ${command.usage}`;
        }
        return message.channel.reply(reply);
    }
    
    if(command.guildOnly && message.channel.type === 'dm'){
        return message.channel.send("I can't execute that command here");
    }
    
    
    if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
	   if (timestamps.has(message.author.id)) {
	       const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	       if (now < expirationTime) {
		      const timeLeft = (expirationTime - now) / 1000;
		      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	       }
       }
    }
    
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
    
    if(!message.member.hasPermission('ADMINISTRATOR') && command.requiresAdministrativePower){
       return message.reply('You must have administrative power to execute that command.')
    }
    
    try{
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply('There was an error to execute that command');
    }
    
    
    // TODO: knock knock joke
    /*if(message.content === "!knockknock"){
        message.channel.send("Who is there?")
        knockknockjoke = 1;
    }
    if(knockknockjoke === 1 && ){
        knockknockjoke = 2;
        message.channel.send(`${message} who?`);
    }
    if(knockknockjoke === 3){
        message.channel.send("HAHA!")
    }*/
    
    
    // TODO: reply to swear words
    //console.log(typeof(message.content));
    /*for(word in message.content.split(" ")){
        if(word.toLowerCase() in swearWords){
            isSwear = true;
            break;
        }
    }
    if(isSwear){
        message.channel.send(`${message.author.username}! who told you could swear here without censoring!`);
        isSwear = false;
        return;
    }*/
    
})
