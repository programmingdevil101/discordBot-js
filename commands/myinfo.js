module.exports = {
	name: 'myinfo',
	description: 'send the user their info like username id!',
	execute(message, args) {
		message.channel.send(`Username: ${message.author.username}\nUserId: ${message.author.id}\nDateCreated: ${message.author.createdAt}`)
	},
};