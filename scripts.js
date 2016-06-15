	function change_city()
	{
		var change_city = document.getElementById('change_city');
		if(change_city.options.selectedIndex != 0)
		{
			var query = document.createElement('script');
			var value_select = change_city.options[change_city.options.selectedIndex].value;
			forecast.innerHTML = '';
			query.src = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'' + value_select + '\')&format=json&callback=callback_function';
			document.body.appendChild(query);
		}
	}//End change_city()
	
	var callback_function = function(data)
	{
		var location = data.query.results.channel.location;
		var forecast = data.query.results.channel.item.forecast;
		var link = data.query.results.channel.link;
		now_location.value = location.city;
		for(var item in forecast)
		{
			var html_element = document.createElement('div');
			html_element.setAttribute('class', 'forecast');
			html_element.class = 'forecast';
			//генерация html-элементов
			html_element.innerHTML = '<img class="image_weather" title="' + convert_message_eng_to_rus(forecast[item].text) + '" src="' + enter_background(convert_message_eng_to_rus(forecast[item].text)) + '"><a href="' + link + '"><div class="forecast_text"><div class="forecast_date"><span class="forecast_temp">' + forecast[item].date + '</span> (' + convert_day_eng_to_rus(forecast[item].day) + ')</div>' + '<div class="forecast_info"><span class="forecast_temp">' + fahrenheit_to_celsius(forecast[item].high, forecast[item].low) + '°C</span> (' + convert_message_eng_to_rus(forecast[item].text) + ')</div></div></a>';			
			document.getElementById('forecast').appendChild(html_element);
		}	
	};//End callback_function()
	
	function convert_day_eng_to_rus(day)
	{
		if(day.toLowerCase() == 'sun')
			return 'Вс';
		if(day.toLowerCase() == 'mon')
			return 'Пн';
		if(day.toLowerCase() == 'tue')
			return 'Вт';
		if(day.toLowerCase() == 'wed')
			return 'Ср';
		if(day.toLowerCase() == 'thu')
			return 'Чт';
		if(day.toLowerCase() == 'fri')
			return 'Пт';
		if(day.toLowerCase() == 'sat')
			return 'Сб';
		return day;
	}//End convert_day_eng_to_rus()
		
	function convert_message_eng_to_rus(message)
	{
		if(message.indexOf('Cloudy') != -1)
			return 'Облачно';
		if(message.indexOf('Showers') != -1 || message.indexOf('Rain') != -1)
			return 'Дождь';
		if(message.indexOf('Thunderstorms') != -1)
			return 'Гроза';
		if(message.indexOf('Sunny') != -1)
			return 'Солнечно';
		if(message.indexOf('Freez') != -1 || message.indexOf('snow') != -1)
			return 'Снег';
		return message;
	}//End convert_message_eng_to_rus()
		
	function enter_background(message)
	{
		if(message == 'Облачно')
		{
			return 'облачно.png'; 
		}
		if(message == 'Солнечно')
		{
			return 'солнечно.png'; 
		}
		if(message == 'Дождь')
		{
			return 'дождь.png'; 
		}
		if(message == 'Гроза')
		{
			return 'гроза.png'; 
		}
		if(message == 'Снег')
		{
			return 'снег.png'; 
		}
		return '';
	}//End enter_background()
	
	function fahrenheit_to_celsius(high_temp, low_temp)
	{
		return Math.round( ((high_temp - (high_temp - low_temp) / 2)-32) * 5 / 9 );
	}//End fahrenheit_to_celsius()