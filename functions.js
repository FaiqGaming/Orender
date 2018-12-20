module.exprots = {
 
  ping: function() {
  
    return 'Hello!';
    
  },
  
  embed: function(channel, message, timer) {
   
    channel = channel.channel || channel;
    
    channel.send({embed:{
      description: message,
      color: 0x1db954
    }}).then(msg => {
      if (!isNaN(timer)) msg.delete({timeout: timer})
    })
    
  }
  
}