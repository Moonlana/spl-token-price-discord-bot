const Util = require("../utils/util");
const cron = require('cron');

exports.fnRunCrons = function() {
    const updatePrice = cron.job('0 */2 * * * *', async function() {
        client.user.setPresence(`MOLA ${await Util.getMarketPriceSerum()}$`);
        client.user.setActivity('MOLA/USDC on Serum');
    });
    updatePrice.start();
}