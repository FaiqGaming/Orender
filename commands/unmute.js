exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}**, Sorry You Can't Use The Command!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, Sorry I Dont Have Permission \`MANAGE_ROLES\` To Unmute A Member!`).then(msg=>msg.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}**, Sorry I Can't Search Your Member!`).then(msg=>msg.delete(5000));
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, Is Not Has Been Muted Try To Mute The Member.`).then(msg=>msg.delete(5000));
    await (member.removeRole(muterole.id));
    message.channel.send(`<@${member.id}> You Has Been Unmuted`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute",
    description: "Unmute seseorang",
    usage: "unmute [@mention someone]"
}