const { ShardingManager } = require('discord.js');
const TOKEN = process.env.TOKEN; 

const shards = new ShardingManager(`./app.js`, {
    totalShards: 1,
    token: process.env.TOKEN
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn(1);