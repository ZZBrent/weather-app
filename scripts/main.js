//A special thanks to the Simple weather jQuery library

$('.ChangeTempStyle').on('click', function () {
    if (temp == 0) {
        html = tempC;
        html += '&deg;C';
        temp = 1;
    }
    else {
        html = tempF;
        html += '&deg;F';
        temp = 0;
    }

    $("#temp").html(html);
});

$(document).ready(function () {
    var tempC;
    var tempF;
    var temp = 0;
    /* Checks if the browser support geolocation? */
    if ("geolocation" in navigator) {
        /* Uses the user's location */
        navigator.geolocation.getCurrentPosition(function (position) {
            loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using the user's coordinates
        });
    } else {
        //If the browser does not support GeoLocation, it will show the weather from Seattle
        loadWeather('Seattle', '');
    }
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'f',
        success: function (weather) {
            html = '<h2><i class="icon-' + weather.code + '"></i></h2><h2 id=temp>' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
            html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
            html += '<li class="currently">' + weather.currently + '</li></ul>';
            tempC = weather.alt.temp;
            tempF = weather.temp;
            $("#weather").html(html);
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}