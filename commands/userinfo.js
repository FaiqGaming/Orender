const Discord = require("discord.js");

const statusAnimation =
{
	'online' : `<a:onlinegif:507756091384266757>`,
	'idle' : `<a:idlegif:524914804524318740>`,
	'streaming' : `<a:streaminggif:525117306095796225>`,
	'dnd' : `<a:dndgif:507756121193316422>`,
	'invisible' : `<a:invisiblegif:507756148951220225>`,
  'offline' : `<a:invisiblegif:507756148951220225>`
}

const colorMap =
{
   'online' : '#00FF00',
   'idle' : '#FF8000',
   'streaming' : '#A901DB',
   'dnd' : '#FF0000',
   'invisible' : '#848484',
   'offline' : '#848484'
}

const statusText =
{
	'online' : 'Online',
	'idle' : 'Idle',
	'streaming' : 'Streaming',
	'dnd' : 'Do Not Disturb',
	'invsible' : 'Invisible',
  'offline' : 'Offline'
}

const isBot =
{
	'true' : 'Bot Users',
	'false' : 'Human Users'
}
  exports.run = async(client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    // Define the member of a guild.
    const member = message.guild.member(user);
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setThumbnail(user.displayAvatarURL)
  .addField("ID", `${user.id}`, true)
  .addField("Username", `${user.username}`, true)
  .addField("Discriminator", `#${user.discriminator}`, true)
  .addField('Nickname', `${member.nickname ? '' + member.nickname + '' : 'None'}`, true)
  .addField("Registered", new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
  .addField('Joined', new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
  .addField("Status", statusAnimation[user.presence.status]+' '+statusText[user.presence.status], true)
  .addField("Member Type", isBot[user.bot], true)
  .setColor(colorMap[user.presence.status])
  message.channel.send(embed);
}