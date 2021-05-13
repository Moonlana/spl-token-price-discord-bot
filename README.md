# spl-token-price-discord-bot
Bot to bring the price of a certain market directly from Serum Dex

# Requirements
spl-token-price-discord-bot 1.0+ requires the following:
* NodeJS 11.15.0

# Installing basic dependencies
```
sudo apt update
sudo apt install git
sudo apt install build-essential
sudo apt install curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
Reopen the terminal
```
nvm install v11.15.0
```

Check your node version
```
node -v 
```

# Installing the redis server
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install redis-server
sudo systemctl enable redis-server.service
```

Verify the connection
```
$ redis-cli

127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```


# Clone repo

Go to home directory
```
cd home/ 
git https://github.com/Moonlana/spl-token-price-discord-bot.git
cd spl-token-price-discord-bot
npm install --save
npm install pm2 -g
```

.env.json
```
cd home/
cd spl-token-price-discord-bot/
```

```
  "ALIASCOMMAND": ".",
  "TOKENBOT": "",
  "TOKENSUPPLY": 5000000000,
  "CIRCSUPPLY": 2299600000,
  "TOKENPAIR": "MOLAUSDC",
  "MAXCONSULT": 1,
  "SECONDCONSULT": 120,
  "MINCONSULT": 2
```

# Execute the bot

```
pm2 start index.js
```
