const Discord = require('discord.js');
const env = require('../env.json');
const Util = require('../utils/util.js');

exports.execute = async ( msg ) => {
    try {
        
      if( !await Util.getConsultUserRedis(msg) ) {
          let geckoInfo = await Util.getMarketPriceGecko();
          const markPrice = geckoInfo.market_data.current_price.usd;
          const supply = await Util.getSupply();
          const priceEmbed = new Discord.RichEmbed()
              .setColor('#fffff0')
              .setTitle(`${env.TOKENPAIR} ≈ ${markPrice}$`)
              .setDescription(`Market Cap: ${(supply.circ_supply*markPrice).toLocaleString(undefined,{ minimumFractionDigits: 2 })}$\nCirc. Supply: ${supply.circ_supply.toLocaleString(undefined,{ minimumFractionDigits: 2 })}\nTotal Supply: ${supply.supply.toLocaleString(undefined,{ minimumFractionDigits: 2 })}\nFully Diluted: ${ (supply.supply * markPrice).toLocaleString(undefined,{ minimumFractionDigits: 2 }) }$`)
              .setThumbnail('https://i.ibb.co/NtrSyDc/moonlana.jpg')
              .setFooter('Data provided by Coingecko')
          msg.channel.send(priceEmbed);
      }
    } catch (error) {
        console.error(error);
    }
};
exports.info = {
    alias: ['price'],
};