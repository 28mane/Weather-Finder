function withCityName(unit, unitSymbol){
	var cityname = $('.cityName').val();	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=" + unit + "&appid=00afdf38c83627cf7287d8444e9cd599", function(data){
		$('#data').html(data.main.temp).append(unitSymbol + ", " + data.name + ", " + data.sys.country);		
		$('.weatherImgs').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon +'.png');
		$('.main').html(data.weather[0].main + "<br/> <br/>" + data.weather[0].description);
	});
}

function withLatLon(unit, unitSymbol){
	if(navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(function(position){
      		lat = position.coords.latitude;
      		lon = position.coords.longitude;
    		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + unit +"&appid=00afdf38c83627cf7287d8444e9cd599", function(data){
				$('#data').html(data.main.temp).append(unitSymbol + ", " + data.name + ", " + data.sys.country);	
				$('.weatherImgs').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon +'.png', 'alt', 'Current weather icon');
				$('.main').html(data.weather[0].main + "<br/> <br/>" + data.weather[0].description);
			});
    	});
  	}	
}

$(document).ready(function(){
	$('.cityName').html(" ");
	$('.cityName').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		var unit = 'metric';
		var unitSymbol = '&#8451;';
		if(keycode ==  '13' && $('.cityName').val() !== ""){
			withCityName(unit, unitSymbol);
		}	
		else if(keycode ==  '13' && $('.cityName').val() == ""){
  			withLatLon(unit, unitSymbol);
		}
	});

	$('.toggleTempUnits').click(function(){
		var tempData = $('.toggleTempUnits');
		var tempUnit = tempData.text();
		if(tempUnit.toLowerCase() === 'celcius'){
			$('.toggleTempUnits').html('Fahrenheit');
			var unit = 'metric';
			var unitSymbol = '&#8451;';
			if($('.cityName').val() !== ""){
				withCityName(unit, unitSymbol);
			}	
			else if($('.cityName').val() == ""){
  				withLatLon(unit, unitSymbol);
			}			
		}
		if(tempUnit.toLowerCase() === 'fahrenheit'){
			$('.toggleTempUnits').html('Celcius');
			var unit = 'imperial';
			var unitSymbol = '&#8457;';
			if($('.cityName').val() !== ""){
				withCityName(unit, unitSymbol);
			}	
			else if($('.cityName').val() == ""){
  				withLatLon(unit, unitSymbol);
			}									
		}		
	});
});
