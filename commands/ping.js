const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  message.channel.send("Pong Current Ping Is ", client.ping)
}

module.exports.help = {
  name: "ping"
}
