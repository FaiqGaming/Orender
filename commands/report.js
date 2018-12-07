const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find the User!");
  let reason = args.join(" ").slice(22);
  
  let reportEmbed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("Reported Logs")
  .addField("Reported User:", `${rUser} With ID: ${rUser.id}`)
  .addField("Reported By:", `${message.author} With ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt);
  
  let reportsChannel = message.guild.channels.find(`name`, "logs");
  if(!reportsChannel) return message.channel.send("Couldn't find logs Channel.");
  
  message.delete().catch(O_o=>{});
  reportsChannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
