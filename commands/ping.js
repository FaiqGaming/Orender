const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let ertembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(":computer: Ping Is", `${client.ping}ms`)
  
  message.channel.send(ertembed);
}
