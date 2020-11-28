module.exports = {
	name: 'args-info',
	description: 'sample arg info!',
    args: true,
    usage: '<arguments>',
	execute(message, args) {
		if(args[0] === 'foo'){
            return message.channel.send('bar');
        }
        
        message.channel.send(`Arguments: ${args}\nArgument length: ${args.lenght}`);
	},
};