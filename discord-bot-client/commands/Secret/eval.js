module.exports = {
  name: 'eval',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<code",
  desc: "Runs the specified code.",
  example: ['message.channel.name'],
  cooldown: undefined,
  run: async(client, message, args) => {
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl",split:true});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}