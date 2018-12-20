exports.run = (client, message, args) => {
 let say = args.join(' ');
 if (!say) return message.channel.send("Send A Text For Say!");
 message.delete();
 message.channel.send(say)
}