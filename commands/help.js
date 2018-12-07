const Discord = require("discord.js");

exports.run = (client, message, args) => {
 let helpembed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setTitle("**OrenderClient's Command Help**")
 .addField(":hammer_pick: Utility", '**Ping,** **Say,**')
 .addField(":warning: Administrator", '**Report,**')
 .addField(":checkered_flag: Fun", '**Cat,** **Dog,**')
 .addField("💸 Economy", '**Balance,** **Pay,** **Daily,**')
 .addField(":lock: Developer", '**Eval,**')
 
 message.channel.send(helpembed);
}
