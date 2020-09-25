const weather = require('weather-js');
const Discord = require('discord.js');


module.exports = {
    name: 'weather',
    description: "sends weather info",
    execute(message, args){
        weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
            if(!args[0])
                return message.channel.send('Error:        Missing Location Input\nSyntax:     $weather location-here\nExample:  $weather Pittsburgh, PA')
            if(result === undefined || result.length === 0)
                return message.channel.send("Error: Invalid Location")

            var current = result[0].current;
            var forecast = result[0].forecast[1];
            var temp =  parseInt(current.feelslike);
            var humid = parseInt(current.humidity);
            var prec = parseInt(forecast.precip);
            var color = 0;
            if(temp > 80)
                color = 0xfd6f00;
            if(temp >= 68 && temp <= 80)
                color = 0xffe700;
            if(temp >= 45 && temp < 68)
                color = 0x9af9be;
            if(temp < 45)
                color = 0x00fcff;
            const embed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint} | ${current.day} ${current.date} `)
                .setThumbnail(current.imageUrl)
                .setColor(color)
                .addField('Time', current.observationtime, true)
                .addField('Temperature', `${current.temperature} °F`, true )
                .addField('Feels Like', `${current.feelslike} °F`, true)
                .addField('High', `${forecast.high}°F `, true)
                .addField('Low', `${forecast.low}°F `, true)
                .addField('Precipitation', `${forecast.precip}%`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
           
            message.channel.send({embed});
            if(prec > 50)
            {
                if(current.skytext === 'Rain' || current.skytext === 'Rain Showers')
                    message.channel.send("Bring an umbrella!");
                else
                    message.channel.send("Chance to rain, bring an umbrella just in case!");
            }
            if(current.skytext === 'Snow')
                message.channel.send("Snow! Wear some boots.")
            if(temp > 80)
                message.channel.send("HOT! Dress lightly!");
            if(temp >= 68 && temp <= 80)
            {
                if(current.skytext === 'Sunny' && humid < 50)
                    message.channel.send("It's a great day to go outside!");
                else
                message.channel.send("It's a warm day. Perfect for summer clothes!");
            }
            if(temp >= 45 && temp < 68)
                message.channel.send("It's a little chilly, dress warmer.");
            if(temp < 45)
                message.channel.send("Today is cold, bring a jacket!");
        });
    }
}
        

    

