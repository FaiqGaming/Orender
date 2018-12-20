const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send('You can Use This Command In NSFW Channels :lock:')
    superagent.get('https://nekos.life/api/v2/img/lewd')
    .end((err, response) => {
        const lewdembed = new Discord.RichEmbed()
        .setImage(response.body.url)
        .setColor(`RANDOM`)
        message.channel.send(lewdembed);
    });

}
    
exports.conf = {
    aliases: [],
    cooldown: "5"
}
    
exports.help = {
    name: "newdneko",
    description: "Mendapatkan random gif",
    usage: "newdneko"
}