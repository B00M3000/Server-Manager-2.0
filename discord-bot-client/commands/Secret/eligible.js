module.exports = {
  name: 'eligible',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  desc: "Checks if your eligible to join a giveaway which requirement is to add the bot to a server you own.",
  example: [],
  cooldown: 2000,
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author.id
    if(!user) return message.channel.send('No mention or ID detected')
    const ownerID = user.id

    const promises = [ client.shard.fetchClientValues('guilds.cache') ]

    return Promise.all(promises)
      .then(results => {
        var messages = []
        var guilds = []
        for( guild of results[0][0]){
          if(guild.ownerID == ownerID) guilds.push(guild)
        }
        if(guilds.length < 1) {
          return message.channel.send("You/They are ineligible to participate this giveaways that require adding me. Use the `help` command to invite me.")
        }
        message.channel.send('Looks like you/they are eligible to enter giveaways that require adding me. Congrats!')
      })
      .catch(console.error);
  }
}
