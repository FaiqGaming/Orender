const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
let prefix = 'o!';
const fs = require("fs");

client.on('ready', () => {
  console.log('Ready A Function');
  client.user.setActivity("Orender | o!help", {type: "WATCHING"});
});

client.on('message', (message) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  if(!message.content.startsWith(prefix));
  let messageArray = message.content.split(" ");
  let args = message.content.slice(prefix.length).trim().split(' ');
  let sender = message.author;
  let cmd = args.shift().toLowerCase()
  
  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.stack);
  } finally {
    console.log(`${message.author.tag} Running Command`);
  }
})

client.login(process.env.BOT_TOKEN);
