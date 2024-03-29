const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'uptime',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  cooldown: 2000,
  desc: "Checks uptime",
  example: [],
  module: "Util",
  run: async(client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle('Uptime')
    .setColor('GREEN')
    .setDescription(ms(client.uptime, {long:true}))
    message.channel.send(embed)
  }
}
