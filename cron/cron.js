const Util = require("../utils/util");
const cron = require('cron');

exports.fnRunCrons = function() {
    const updatePrice = cron.job('0/30 * * * * *', async function() {
        let geckoPrice = await Util.getMarketPriceGecko();
        client.user.setPresence({ status: 'online',
        game: {
          name: `${geckoPrice.market_data.current_price.usd}$ MOLA/USDC on Coingecko`,
          type: 'WATCHING'
        }});
    });
    updatePrice.start();
}