const killMessages = [
  '{killer} threw a rock at {victim} and killed them',
  '{victim} stepped on a landmine',
  '{killer} shot {victim}',
  '{killer} stabbed {victim}',
  'A atom bomb fell out of a B2 bomber and landed next to {victim} killing him/her instantly'
]
module.exports = {
  name: 'kill',
  aliases: ['murder'],
  reqPerm: "NONE",
  args: "<user mention or id>",
  cooldown: 1000,
  desc: "Displays a kill message with your and the mentioned users names.",
  example: ['@Commander786', '@!!Noobman13!!'],
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    if (!user) return message.channel.send("Please mention or add the users user id after the command.")

    let killMessage = killMessages[Math.floor(Math.random() * killMessages.length)]

    let finalMessage = killMessage.replace('{killer}', message.author.username).replace('{victim}', user.username)

    message.channel.send(finalMessage)
  }
}