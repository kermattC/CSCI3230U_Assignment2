$(document).ready(function () {
    $("#goButton").on('click', function(){
        $.getJSON('http://api.apixu.com/v1/current.json?q=43.944847,-78.891703&days=7&key=fe34f785ddd3406dbbf202145191203', function(data) {
            $.each(data, function(key, value) {
                if (key == "location"){
                    console.log('(From current)' , value.name);
                }
                if (key == "current"){
                    console.log('(From current)', value.wind_mph);
                }
            });
        });
        $.getJSON('http://api.apixu.com/v1/forecast.json?q=43.944847,-78.891703&days=7&key=fe34f785ddd3406dbbf202145191203', function(data) {
            $.each(data, function(key, value) {
                if (key == "location"){
                    console.log('(From forecast)', value.name);
                }
                if (key == "current"){
                    console.log('(From forecast)', value.wind_mph);
                }
                // example of finding two layers of nested objects
                $.each(value, function(innerKey, innerValue){
                    if (innerKey == "condition"){
                        $.each(innerValue, function (innerInnerKey, innerInnerValue){
                            console.log('(From forecast) Code:' , innerValue.code);
                        });
                    }
                    // example of finding 3 layers of nested objects
                   if (innerKey == "forecastday"){
                       $.each(innerValue, function(innerInnerKey, innerInnerValue){
                           if (innerInnerKey == "1"){
                            $.each(innerInnerValue, function (innerInnerInnerKey, innerInnerInnerValue){
                                if (innerInnerInnerKey == "day"){
                                $.each(innerInnerInnerValue, function(innerInnerInnerInnerKey, innerInnerInnerInnerValue){
                                    console.log('(From forecast) Next day max celsius:' , innerInnerInnerValue.maxtemp_c);
                                });
                            }
                            });
                           }
                       })
                   }
                });
            });
        });
    });
});;

