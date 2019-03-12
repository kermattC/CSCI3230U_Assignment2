$(function(){
    $("#goButton").on('click', function(){
        $.getJSON('http://api.apixu.com/v1/forecast.json?key=fe34f785ddd3406dbbf202145191203&q=Paris', function(data) {
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
}) ;

