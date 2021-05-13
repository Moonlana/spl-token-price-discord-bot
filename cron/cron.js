const Util = require("../utils/util");
const cron = require('cron');

exports.fnRunCrons = function() {
    const updatePrice = cron.job('0/30 * * * * *', async function() {
        client.user.setUsername(`MOLA ${await Util.getMarketPriceSerum()}$`);
        client.user.setActivity('MOLA/USDC on Serum');
    });
    updatePrice.start();
}