$(document).ready(function () {
    $('#goButton').on('click', function(){
        var lat = $('#lat').val();
        var lon = $('#lon').val();
        //°
    
        getCurrent(lat, lon);
        getForecast(lat, lon);

        $("#weather").addClass('weather');
        $("#forecast").addClass('forecast');

    });
});

function getCurrent(lat, lon){
    $.ajax({
        url: "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&key=fe34f785ddd3406dbbf202145191203", success:function (data){

        $("#weather").append("TEMPERATURE:" + "<br />");
        $("#weather").append("<br />" + "Current: " + data.current.temp_c + "°C");
        $("#weather").append("<br />" + "Low: " + data.forecast.forecastday[0].day.mintemp_c + "°C");
        $("#weather").append("<br />" + "High: " + data.forecast.forecastday[0].day.maxtemp_c + "°C");
        $("#weather").append("<br />" + "Feels like: " + data.current.feelslike_c + "°C");
        
        $("#weather").append("<br />"+"<br />" + "CONDITION:" + "<br />")
        $("#weather").append("<br />" + "Type: " + data.current.condition.text);
        $("#weather").append("<br />" + "Cloud Cover: " + data.current.cloud + "%");
        $("#weather").append("<br />" + "Humidity: " + data.current.humidity + "%");
        $("#weather").append("<br />" + "Pressure: " + data.current.pressure_mb + "mB");

        $("#weather").append("<br />"+ "<br />" + "WIND:" + "<br />");
        $("#weather").append("<br />" + "Direction: " + data.current.wind_dir + "°");
        $("#weather").append("<br />" + "Speed: " + data.current.wind_kph + "km/h");

        // $.each(data, function(key, value) {
        //     if (key == "location"){
        //         console.log('(From current)' , value.name);
        //     }
        //     if (key == "current"){
        //         console.log('(From current)', value.wind_mph);
        //     }
        // });
        }
    });
}

function getForecast(lat, lon){
    $.ajax({
        url: "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&days=7&key=fe34f785ddd3406dbbf202145191203", success:function (data){
            console.log("Forecast for next 7 days");
            $("#forecast").append("<br />"+ "Forecast: " + "<br />");
            $("#forecast").append("<br />"+ "Date &emsp; &emsp; &emsp; &emsp; Condition: &emsp; &emsp; &emsp; &emsp; High: &emsp; &emsp; &emsp; &emsp; Low: &emsp; &emsp; &emsp; &emsp; Wind: &emsp; &emsp; &emsp; &emsp; Outlook: <br/>");

            for (let i = 0; i < data.forecast.forecastday.length; i++){
                $("#forecast").append(data.forecast.forecastday[i].date + 
                "&emsp;" + "<img src='https:"+data.forecast.forecastday[i].day.condition.icon+"'>" + 
                
                "&emsp;" + data.forecast.forecastday[i].day.maxtemp_c +
                "°C &emsp;"+ data.forecast.forecastday[i].day.mintemp_c + 
                "°C &emsp;"+  data.forecast.forecastday[i].day.maxwind_kph + 
                "km/h &emsp;" + data.forecast.forecastday[i].day.condition.text + 
                "<br />");
            }
        // $.each(data, function(key, value) {
        //     if (key == "location"){  
        //         console.log('(From forecast)', value.name);
        //     }
        //     if (key == "current"){
        //         console.log('(From forecast)', value.wind_mph);
        //     }
        //     // example of finding two layers of nested objects
        //     $.each(value, function(innerKey, innerValue){
        //         if (innerKey == "condition"){
        //             $.each(innerValue, function (innerInnerKey, innerInnerValue){
        //                 console.log('(From forecast) Code:' , innerValue.code);
        //             });
        //         }
        //         // example of finding 3 layers of nested objects
        //         if (innerKey == "forecastday"){
        //             $.each(innerValue, function(innerInnerKey, innerInnerValue){
        //                 if (innerInnerKey == "1"){
        //                     $.each(innerInnerValue, function (innerInnerInnerKey, innerInnerInnerValue){
        //                         if (innerInnerInnerKey == "day"){
        //                             $.each(innerInnerInnerValue, function(innerInnerInnerInnerKey, innerInnerInnerInnerValue){
        //                             console.log('(From forecast) Next day max celsius:' , innerInnerInnerValue.maxtemp_c);
        //                             });
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     });
        // });
        }
    });
}
