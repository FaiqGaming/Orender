const { ShardingManager } = require('discord.js');
const Discord = require("discord.js");
const moment = require("moment-timezone");
const db = require('quick.db')
const ms = require("ms");
const send = require(`quick.hook`);
const fs = require("fs");
const fetchUser = require("discord.js");
const shard = require("discord.js");
const uptime = require("discord.js");
const status = require("discord.js");
const { Canvas } = require('canvas-constructor');
let queue = new Map();
const ytdl = require("ytdl-core");
const youtube = require("simple-youtube-api");

exports.run = async (client, message, args, color, prefix) => {
  
    if (message.author.id !== '297130271864520705' && message.author.id !== '508062933033549852') return message.channel.send(":x: You Can't Run The Command You Are Not Developer");
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed).then(embedMessage => {
        embedMessage.react("✅");
})
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``).then(embedMessage => {
        embedMessage.react("❌");
    })
    }
}

exports.help = {
    name: 'eval',
    category: 'OWNER BOT'
}