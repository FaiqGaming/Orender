const http = require('http');
const express = require('express');
const app = express();

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const { ShardingManager } = require('discord.js');
const Discord = require("discord.js");
const moment = require("moment-timezone");
const { Client, Util } = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOTMzMDQxODY0MjkxMTIzNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1MTg4Mzk4fQ.uYriOBoJNFgitrVf9edd6_P-xME1bBSlSD19PHBBWsQ', client);
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.YOUTUBE);
const math = require('mathjs')
let prefix = 'o!';
const config = require("./config.json");
const fs = require("fs");
const db = require("quick.db");
const tools = require("./functions.js");
const ytdl = require('ytdl-core');
client.snek = require('node-superfetch')
let queue = new Map();

function changing_status() {
  let status = [`Oredon Clienter | o!help`, `With ${client.users.size} users`, `With ${client.guilds.size} servers`, `With ${client.channels.size} channels`, `Launched Shard #${client.shard.count}`, `At ${moment().tz("Asia/Jayapura").format('LT')} WIT`]
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setGame(random, 'https://www.twitch.tv/users');
}

dbl.on('posted', () => {
  console.log('Server has been posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.on('ready', () => {
  console.log('Ready A Function');
  setInterval(changing_status, 10000);
});

client.on("guildMemberAdd", async member => {
  let autoRole = await db.fetch(`autorole_${member.guild.id}`).catch(err => console.log(err));
  let autorole = member.guild.roles.find('name', autoRole);
  member.addRole(autorole);
})

client.on('message', async (message) => { // eslint-disable-line
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
 
  if (message == `<@${client.user.id}>` || message == `<@!${client.user.id}>`) {
      message.reply(`My prefix is **${config.bot_prefix}**`);
}
  
  if(!message.content.startsWith(prefix)) return;
  var args = message.content.slice(prefix.length).trim().split(' ');
  var messageArray = message.content.split(" ");
  var searchString = messageArray.slice(1).join(' ');
  var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  console.log(searchString);
  var serverQueue = queue.get(message.guild.id);
  var sender = message.author;
  var cmd = args.shift().toLowerCase();
  
  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, tools, queue, serverQueue);
  } catch (e) {
    console.log(e.stack);
  } finally {
    console.log(`${message.author.tag} Running Command ${cmd}`);
  }
  
// Music Command
// ============================================================================================================================================
  if(cmd === 'play') {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('I\'m Sorry But You Need To Be In A Voice Channel To Play Music!');
    let permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send("I Cannot Connect To Your Voice Channel, Make Sure I Have The Proper Permissions!");
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send("I Cannot Speak In This Voice Channel, Make Sure I Have The Proper Permissions!");
    }
    
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        var playlist = await youtube.getPlaylist(url);
        var videos = await playlist.getVideos();
        for (var video of Object.values(videos)) {
            var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return message.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                message.channel.send(`
__**Song Selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
                    `);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time'] 
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send('No or invalid entered, cancelling video selection.');
                    }
                    var videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
              console.error(err);
              return message.channel.send('I could not obtain any search results.')
            } 
        }
      
        return handleVideo(video, message, voiceChannel);
    }
} else if (cmd === 'skip') {
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      if (!serverQueue) return message.channel.send('There is not nothing playing that I could skip for you.');
      serverQueue.connection.dispatcher.end('Skip command has been used!');
      message.channel.send("Song Has Been Skipped!");
      return undefined;
} else if (cmd === 'stop') {
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      if (!serverQueue) return message.channel.send('There is not nothing playing that I could stop for you.');
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end('Stop command has been used!');
      message.channel.send("Song Has Been Stopped!");
      return undefined;
} else if (cmd === 'volume') {
      if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
      if (!serverQueue) return message.channel.send("There is nothing playing.");
      if (!messageArray[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
      serverQueue.volume = messageArray[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(messageArray[1] / 10);
      return message.channel.send(`I Set The Volume To: **${messageArray[1]}**`);
} else if (cmd === 'np') {
      if (!serverQueue) return message.channel.send("There is nothing playing.");
      return message.channel.send(`:notes: Now Playing: **${serverQueue.songs[0].title}**`);
} else if (cmd === 'queue') {
      if (!serverQueue) return message.channel.send("There is nothing playing.");
      return message.channel.send(`
__**Song Queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now Playing:** ${serverQueue.songs[0].title}
      `);
} else if (cmd === 'pause') {
      if (serverQueue && serverQueue.playing) {      
          serverQueue.playing = false;
          serverQueue.connection.dispatcher.pause();
          return message.channel.send("The music has been paused.");
      }
      return message.channel.send("There is nothing playing.");
} else if (cmd === 'resume') {
      if (serverQueue && !serverQueue.playing) {
          serverQueue.playing = true;
          serverQueue.connection.dispatcher.resume();
          return message.channel.send("The music has been resumed.");
      }
      return message.channel.send("There is nothing playing.");
}
  
  return undefined;

async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    console.log(video);
    var song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    }
    if (!serverQueue) {
        var queueConstruct = {
           textChannel: message.channel,
           voiceChannel: voiceChannel,
           connection: null,
           songs: [],
           volume: 10,
           playing: true
        };
        queue.set(message.guild.id, queueConstruct);
      
        queueConstruct.songs.push(song);
      
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I Could Not Join The Voice Channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`I Could Not Join The Voice Channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return undefined;  
        else return message.channel.send(`**${song.title}** has been added to the queue!`)
    }  
    return undefined;
}

function play(guild, song) {
    let serverQueue = queue.get(guild.id);
  
  if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
  }
  console.log(serverQueue.songs);
  
    var dispatcher = serverQueue.connection.playStream(ytdl(song.url))
       .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song Has Been Ended Now!');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
         })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);
  
    serverQueue.textChannel.send(`:notes: Start Playing: **${song.title}**`);
}
// ============================================================================================================================================
})
client.login(process.env.TOKEN);