const Discord = require("discord.js");
const { ShardingManager } = require("discord.js");
var platform = require('platform')
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

module.exports.run = async (client, message, args) => {
  message.delete()
  let API = (client.ping).toFixed(2)
  let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
    }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(bicon)
    .addField("**Bot Info**", `Name: \n**${client.user.username}**`)
    .addField("📊 | Statistic", `• ${client.guilds.size} Guilds\n• ${client.channels.size} Channels\n• ${client.users.size} Users \n• ${client.shard.count} Shards`)
    .addField("💬 | Prefix", `\`o!\` Is my prefix`)
    .addField("🖥️ | Platform", `Windows 10`)
    .addField(":floppy_disk: | MEM Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
    .addField(":thermometer: | CPU Usage", `\`${percent.toFixed(2)}%\` / \`Unlimited!\``)
    .addField("📚 | Library", `discord.js`)
    .addField("💻 | API Latency", `${API}ms`)
    .addField("👤 | Developed By:", `Oredon Clienter or <@508062933033549852>`)
    .setFooter("Bot Version 1.1.0", client.user.displayAvatarURL);

    message.channel.send(botembed);
    });
    };
      
module.exports.help = {
  name: "botinfo",
  category: "INFO"
}