const https = require('https');
const Discord = require('discord.js');
const urls = ['https://www.reddit.com/r/meme/hot/.json?limit=100', 'https://www.reddit.com/r/memes/hot/.json?limit=100']

module.exports = {
  name: 'meme',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  cooldown: 1000,
  desc: "Displays a meme.",
  example: [],
  run: async(client, message, args) => {
    var url = urls[Math.floor(Math.random() * urls.length)];

    https.get(url, (result) => {
        var body = ''
        result.on('data', (chunk) => {
            body += chunk
        })

        result.on('end', () => {
            var response = JSON.parse(body)
            var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

            if (index.post_hint !== 'image') {

                var text = index.selftext
                const textembed = new Discord.MessageEmbed()
                    .setTitle(subRedditName)
                    .setColor(9384170)
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)

                message.channel.send(textembed)
            }

            var image = index.preview.images[0].source.url.replace('&amp;', '&')
            var title = index.title
            var link = 'https://reddit.com' + index.permalink
            var subRedditName = index.subreddit_name_prefixed

            if (index.post_hint !== 'image') {
                const textembed = new Discord.RichEmbed()
                    .setTitle(subRedditName)
                    .setColor(9384170)
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)

                message.channel.send(textembed)
            }

            const imageembed = new Discord.MessageEmbed()
                .setTitle(subRedditName)
                .setImage(image)
                .setColor(9384170)
                .setDescription(`[${title}](${link})`)
                .setURL(`https://reddit.com/${subRedditName}`)
            message.channel.send(imageembed)
        }).on('error', function (e) {
            message.channel.send('A error occured. Run the command again.')
            console.log('Meme Error: ', e)
        })
    })
  },
}