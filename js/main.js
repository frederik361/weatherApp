
  var openWeatherAppId = '12b58fcff4ef1110f0376ca736304daa',
    openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather'

  var prepareData = function(units) {
    // Replace loading image
    var cityName = $('#search_input').val()
    // Make ajax call, callback
    if (cityName && cityName != ''){
      cityName = cityName.trim()
      getData(openWeatherUrl, cityName, openWeatherAppId, units)
    }
    else {
      alert('Please enter the city name')
    }
  }
  $(document).ready(function(){


    $("#search_btn").click(function() {

  if($('#metric_btn').is(':checked')) { prepareData('metric'); }
  else if($('#imperial_btn').is(':checked')) { prepareData('imperial'); }

    })


  })
  function getData (url, cityName, appId, units) {
    var request = $.ajax({
      url: url,
      dataType: "jsonp",
      data: {q: cityName, appid: appId, units: units},
      jsonpCallback: "fetchData",
      type: "GET"
    }).fail(function(error){
      console.error(error)
      alert('Error sending request')
    })
  }
  function fetchData (weather) {
    console.log(weather);

    $('.container').append('<h1 id="city_name">' + weather.name +', '+ weather.main.temp + ' °C'+'</h1>');
    $('.container').append('<h2 id="weather">' + weather.weather["0"].main +'</h2>');
    $('.container').append('<h3 id="wind">'+'Wind: ' + weather.wind.speed +' m/sec'+'</h3>');
    $('.container').append('<p id="icon_id">' + weather.weather["0"].icon +'</p>');


  }
