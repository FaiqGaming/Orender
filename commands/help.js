const Discord = require("discord.js");

exports.run = (client, message, args) => {
 let helpembed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setTitle("**Oredon Clienter's Command Help**")
 .addField("⚒ Utility", '**Ping, Say, BotInfo, ServerInfo, UserInfo, Help, Npm, Afk,**')
 .addField("⚠ Administrator", '**Report, Clear, AutoRole, Ban, Mute, Unmute,**')
 .addField("🎵 Music", '**Play, Queue, Stop, Skip, Np, Volume, Pause, Resume,**')
 .addField("🏁 Fun", '**Cat, Dog, Achievement, Slots, 8Ball,**')
 .addField("💸 Economy", '**Balance, Pay, Daily,**')
 .addField("🔞 NSFW", '**Hentai, NewdNeko,**')
 .addField("⛑ Support Bot", '**Invite,**')
 .addField("🔒 Developer", '**Eval, Exec, Canvas,**')
 
 message.react("✅");
 message.channel.send(helpembed).then(embedMessage => {
 embedMessage.react("👍");
 embedMessage.react("⚒");
 embedMessage.react("⚠");
 embedMessage.react("🎵");
 embedMessage.react("🏁");
 embedMessage.react("💸");
 embedMessage.react("🔞");
 embedMessage.react("⛑");
 embedMessage.react("🔒");
 
})
}