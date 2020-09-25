const Discord = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js');

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.once('ready', () => {console.log('WeatherBot is online!') });
client.on('message', message => { 
     if(!message.content.startsWith(prefix) || message.author.bot) 
       return;

     const args = message.content.slice(prefix.length).split(" ");
     const command = args.shift().toLowerCase();
     
     if (command === 'weather')
     {
         client.commands.get('weather').execute(message, args);
         
     }
     
});



client.login('<your token here>');