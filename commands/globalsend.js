module.exports = {
  name: 'globalsend',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(message.author.id == client.config.OWNERID){
      const content = args.join(" ");
      client.guilds.cache.forEach(guild => {
        client.users.cache.get(guild.ownerID).send(content);
      });
    }
  }
}