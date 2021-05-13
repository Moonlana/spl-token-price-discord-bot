const Discord = require('discord.js');
const env = require('../env.json');
const Util = require('../utils/util.js');

exports.execute = async ( msg ) => {
    try {
        
      if( !await Util.getConsultUserRedis(msg) ) {
          let markPrice = await Util.getMarketPriceSerum();
          const priceEmbed = new Discord.RichEmbed()
              .setColor('#fffff0')
              .setTitle(`${env.TOKENPAIR} ≈ ${markPrice}$`)
              .setDescription(`Market Cap: ${(env.CIRCSUPPLY*markPrice).toLocaleString(undefined,{ minimumFractionDigits: 2 })}$\nCirc. Supply: ${env.CIRCSUPPLY.toLocaleString(undefined,{ minimumFractionDigits: 2 })}\nTotal Supply: ${env.TOKENSUPPLY.toLocaleString(undefined,{ minimumFractionDigits: 2 })}\nFully Diluted: ${ (env.TOKENSUPPLY * markPrice).toLocaleString(undefined,{ minimumFractionDigits: 2 }) }$`)
              .setThumbnail('https://i.ibb.co/NtrSyDc/moonlana.jpg')
              .setFooter('Data provided by Serum Dex')
          msg.channel.send(priceEmbed);
      }
    } catch (error) {
        console.error(error);
    }
};
exports.info = {
    alias: ['price'],
};