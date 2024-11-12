const bot = BotManager.getCurrentBot();

bot.addListener(Event.MESSAGE, msg => {
    if (msg.content === '/ping')
        msg.reply('pong!');
    else if (msg.content === '/hello')
        msg.reply(`Hello, ${msg.author.name}!`);
});