module.exports = {
	name: 'role',
	description: 'Special features regarding roles like showing all roles of guilds, showing roles of certain member and assiging role to certain mamber.',
    args: false,
    requiresAdministrativePower: true,
    usage: `
            To view available roles: <>
            To view roles of  member: <@user>
            To assign a role to user: <@user> <role>
            `,
    guildOnly: true,
	execute(message, args) {
        roles = []
        message.guild.roles.cache.each(role => {
            roles.push(role.name);
        })
		if(!args.length){
            let msg = "Here is a list of available roles:\n"
            roles.forEach(role => {
                msg+=`- ${role}\n`
            });
           return message.reply(msg);
        }else if(args.length == message.mentions.users.size){
            let userRole = []
            let msg = "The mentioned member has following roles:\n"
            message.mentions.members.first().roles.cache.each(role => {
                userRole.push(role.name);
            })
            userRole.forEach(role => {
                msg+=`- ${role}\n`
            })
            
            return message.reply(msg);
        } else if(args.length = message.mentions.users.size+1){
            user = message.mentions.members.first()
            args.shift()
            if(roles.includes(args[0])){
                role = message.guild.roles.cache.find(r => r.name === args[0]);
                user.roles.add(role);
                message.reply(`Role ${args[0]} has been added to ${user.username}`);
            }
        }        
	},
};