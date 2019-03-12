$(document).ready(function () {
    $.getJSON('http://api.apixu.com/v1/current.json?q=43.944847,-78.891703&days=7&key=fe34f785ddd3406dbbf202145191203', function(data) {
        $.each(data, function(key, value) {
            if (key == "location"){
                console.log(value.name);
            }
            if (key == "current"){
                console.log(value.wind_mph);
            }
        });
    });
    $.getJSON('http://api.apixu.com/v1/forecast.json?q=43.944847,-78.891703&days=7&key=fe34f785ddd3406dbbf202145191203', function(data) {
        $.each(data, function(key, value) {
            if (key == "location"){
                console.log(value.name);
            }
            if (key == "current"){
                console.log(value.wind_mph);
            }

        });
    });
});