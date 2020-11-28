module.exports = {
	name: 'kick',
	description: 'to kick a member(not true not atleast now)!',
    requiresAdministrativePower: true,
    guildOnly: true,
    usage: '<user>',
	execute(message) {
        if(!message.mentions.users.size){
            return message.reply('You need to tag a user in order to kick them!')
        }
        
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};