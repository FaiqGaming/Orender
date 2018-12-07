const Discord = require("discord.js");

exports.run = (client, message, args) => {
 let helpembed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setTitle("**OrenderClient's Command Help**")
 .addField(":hammer_pick: Utility", '**Ping,** **Say,** **BotInfo,** **ServerInfo,** **Help,** **Npm,**')
 .addField(":warning: Administrator", '**Report,** **Clear,**')
 .addField(":checkered_flag: Fun", '**Cat,** **Dog,** **Achievement,**')
 .addField("💸 Economy", '**Balance,** **Pay,** **Daily,**')
 .addField(":lock: Developer", '**Eval,**')
 
 message.channel.send(helpembed);
}
