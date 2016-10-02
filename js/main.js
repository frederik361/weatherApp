
  var openWeatherAppId = '12b58fcff4ef1110f0376ca736304daa';
  var  openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  var degrees = " °C";
  var ws = " m\/sec";

  var prepareData = function(units) {

    var cityName = $('#search_input').val();

    if (cityName && cityName != ''){
      cityName = cityName.trim()
      getData(openWeatherUrl, cityName, openWeatherAppId, units)
    }
    else {
      alert('Please enter the city name')
    }

  }
  $(document).ready(function(){

    var showSearch = function(){
      if($('#metric_btn').is(':checked')) { prepareData('metric'); degrees = " °C"; ws = " m/sec"; }
      else if($('#imperial_btn').is(':checked')) { prepareData('imperial'); degrees = " °F"; ws = " mphh"; }
    }


    $("#search_btn").click(function() {

      showSearch();
    });


  });

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
    $('.container').append('<h1 id="city_name">' + weather.name +', '+ weather.main.temp +  degrees +'</h1>');
    $('.container').append('<h2 id="weather">' + weather.weather["0"].main +'</h2>');
    $('.container').append('<h3 id="wind">'+'Wind: ' + weather.wind.speed + ws +'</h3>');
    $('.container').append('<p id="icon_id">' + weather.weather["0"].icon +'</p>');


  }
