const Discord = require("discord.js");
const ColorMap =
{
    'online' : '#00FF00',
    'idle' : '#FF8000',
    'streaming' : '#A901DB',
    'dnd' : '#FF0000',
    'offline' : '#848484'
};
const ngebot =
{
    'true' : 'Bot User',
    'false' : 'Regular User'
};
const StatusMap =
{
    'online' : `<:online:504813930313547776>`,
    'idle' : `<:idle:504813930321805333>`,
    'streaming' : `<:streaming:504813930309222400>`,
    'offline' : `<:offline:504813929780871191>`,
    'dnd' : `<:dnd:504813930246438912>`

};

const StatusText =
{
    'online' : 'Online',
    'idle' : 'Idle',
    'dnd' : 'Do Not Disturb',
    'offline' : 'Offline',
    'streaming' : 'Streaming'
}
const verlev =
{
    '0' : 'None',
    '1' : 'Low',
    '2' : 'Medium',
    '3' : 'High',
    '4' : 'Very High'

}


const servico =
{
    'singapore' : ':flag_sg: Singapore',
    'brazil' : ':flag_br: Brazil',
    'eu-central' : ':flag_eu: Central Europe',
    'hongkong' : ':flag_hk: Hong Kong',
    'japan' : ':flag_jp: Japan',
    'russia' : ':flag_ru: Russia',
    'southafrica' : ':flag_za: South Africa',
    'sydney' : ':flag_au: Sydney, Australia',
    'us-central' : ':flag_us: US Central',
    'us-east' : ':flag_us: US East',
    'us-south' : ':flag_us: US South',
    'us-west' : ':flag_us: US West',
    'eu-west' : ':flag_eu: Western Europe'
}
module.exports.run = (client, message, args) => {
  let embed = new Discord.RichEmbed()
  .setAuthor(`${message.guild.name}`, `${message.guild.iconURL ? message.guild.iconURL : ""}`)
  .setDescription('Here is the server information: ')
  .setThumbnail(`${message.guild.iconURL ? message.guild.iconURL : ""}`)
  .addField('Server Name: ', message.guild.name, true)
  .addField('Server ID: ', message.guild.id, true)
  .addField('Server Owner: ', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
  .addField('Server Region: ', servico[`${message.guild.region}`], true)
  .addField('Members: ', `${message.guild.members.filter(mb => mb.user.bot === false).size} users & ${message.guild.members.filter(mb => mb.user.bot === true).size} bots`, true)
  .addField('Channels: ', `${message.guild.channels.findAll("type", "text").length} text & ${message.guild.channels.findAll("type", "voice").length} voice`, true)
  .addField('Server Roles: ', `${message.guild.roles.size}`, true)
  .addField('Server Emojis: ', `${message.guild.emojis.size}`, true)
  .addField('Verification Level: ', verlev[`${message.guild.verificationLevel}`], true)
  .addField('Server Created: ', new Date(message.guild.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
  .setColor('#FFD800')
  message.channel.sendMessage(embed)
}

module.exports.help = {
  name: "serverinfo"
}
