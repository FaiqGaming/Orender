const db = require("quick.db");

exports.run = async(client, message, args) => {
  
  if(!message.mentions.members.first()) return message.channel.send(`**Please mention a user!**`);
  
  let targetMember = message.mentions.members.first(),
      amount = parseInt(args.join(' ').replace(targetMember, ''));
  
  if (isNaN(amount)) return message.channel.send(`**Please define an amount!**`);
  
  let targetBalance = await db.fetch(`userBalance_${targetMember.id}`),
      selfBalance = await db.fetch(`userBalance_${message.author.id}`);
  
  if (targetBalance === null) targetBalance = 0;
  if (selfBalance === null) selfBalance = 0;
  
  if (amount > selfBalance) return message.channel.send(`**Sorry, You Don't Have Enough Money!**`);
  
  db.add(`userBalance_${targetMember.id}`, amount);
  db.subtract(`userBalance_${message.author.id}`, amount);
  
  message.channel.send(`**Succesfully sent $${amount} To ${targetMember.user.tag}!**`);
  
  // Now let's test it!
}