const Discord = require('discord.js');
const DiscordBotsDev = require('dbdapi.js');
  
  const DBD = new DiscordBotsDev('MzY2ODYyODMxNjcwMjYzODA4Ok5FeFNEUTBwVkcxUEdHd3VjR3lNalV6b1lMbDE2My9vTjl3aGZSM05oU1k9OnZtOUlZQVl4YnRpZysrTlRoYUtaRDk4K0dJVG1OL0tzdlZNMzN4ejhsRnM9', "519330418642911237", '297130271864520705');
exports.run = async (client, message, args) => {
  let mnts = message.mentions.users.first()
      if(!mnts.bot) return message.channel.send("Hey, Sorry This Is Not A Bot!")

  let bots = mnts.id || args[0]
    var botData = await DBD.getBot(bots);
    let user = message.mentions.users.first()
    let embed = new Discord.RichEmbed()
    .setTitle(`<:dbdLogo:511113139740344326> Info Bot ${user.tag} `)
    .addField(`Name:`, `${user.username} | ${user.tag}`)
    .addField(`Owner:`, `${botData.owner.tag}`)
    //.addField(`ID:` `${mnts.user.id}`)
    .setColor("RANDOM")
    .addField("Created:", client.user.createdAt)
    .addField("Prefix:", `${botData.prefix}`)
    .addField("Verified:", "`I Think No Or Yes 🤔 `")    
    .addField("Registration" ,`${user.tag} Has Been Approved With DiscordBots Development <:verified:447628551911374859>`)
    //let WIB = ${moment().utcOffset('+0700').format("HH:mm A")} WiB

    //client.user.setActivity(WIB, {type: "LISTENING"})

        if (!botData || botData === undefined) return message.channel.send("Hey!, Bot Is Not On Servers!");
        //message.channel.send(`${botData.bot.tag} by ${botData.owner.tag} with prefix ${botData.prefix}!`);
        message.channel.send(embed)
}

exports.conf = {
 aliases: 'discordbots'
}

exports.help = {
    name: "dbd"
}