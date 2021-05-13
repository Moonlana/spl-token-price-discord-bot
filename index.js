const env = require('./env.json');
const Discord = require('discord.js');
const client = new Discord.Client();
/* const conf = require('./config.js').jsonConfig();
const logger = require(conf.pathLogger).getLanamonLogger(); */
const DiscordContext = require('discord-context');
const redis = require('redis');
const clientRedis = redis.createClient();
// const rain = require('./commands/rain');
const fs = require('fs');
const Util = require('./utils/util');
const cron = require('./cron/cron.js').fnRunCrons();

global.client = client;
global.clientRedis = clientRedis;
global.client.config = {
  PREFIX: env.ALIASCOMMAND,
};

clientRedis.on('connect', function() {
  console.info('You are now connected on Redis DB');
});

client.on('ready', async () => {
  console.info(`Bot is ready as: ${client.user.tag}!`);
  client.user.setStatus('online');
  client.user.setUsername(`MOLA ${await Util.getMarketPriceSerum()}$`);
  client.user.setActivity('MOLA/USDC on Serum');
});

// add all commands
client.commands = [];
fs.readdir('./commands/', function(err, files) {
  files.forEach((f) => {
    const cmd = require(`./commands/${f}`);
    client.commands.push(cmd);
  });
});


// let other files access commands
exports.commands = () => {
  return client.commands;
};

client.on('message', async (msg) => {
  try {
    global.ctx = new DiscordContext(msg);
    if (msg.author.bot) {
      return;
    }
    if ( msg.content.substring(0, 1) == env.ALIASCOMMAND ) {
      client.commands.forEach((command) => {
        if (command.info.alias.includes(global.ctx.args[0])) {
          command.execute(msg);
        }
      });
    } else {
      // rain.updateActivityUser( msg );
    }
  } catch (error) {
    console.error( error );
  }
});
// token discord bot here
client.login(env.TOKENBOT);
