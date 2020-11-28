module.exports = {
	name: 'server',
	description: 'gives the info about server like name date created!',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`Server Name: ${message.guild.name}\nTotal Member: ${message.guild.memberCount}\nDate Created: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
	},
};