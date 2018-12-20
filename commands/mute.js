exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}**, Sorry You Can't Use The Command!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, Sorry I Dont Have Permission \`MANAGE_ROLES\` To Mute A Member!`).then(msg=>msg.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}**, Sorry I Can't Search Your Member!`);
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: 'Muted',
                color: 'RANDOM',
                permission: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTION: false,
                    CONNECT: false
                });
            });
        } catch(e) {
            console.log(e.message);
        }
    };

    if (member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, Has Been Muted.`);
    await (member.addRole(muterole.id));
    message.channel.send(`**${message.author.username}**, Has Muted <@${member.id}>.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "mute",
    description: "Mute seseorang yang kamu sukai",
    usage: "mute [@mention someone]"
}