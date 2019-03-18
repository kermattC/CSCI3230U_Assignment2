/** Group Members:
 * Dominic Cabitac - 100547918
 * Matt Chan       - 100622178
 */

/** Function loads when the program loads 
 *  Has a button that will clear any previous html
 *  Calls the functions to populate the
 *      bootstrap columns with the new data
 * 
 */
$(document).ready(function () {
    $('#goButton').on('click', function(){
        $("#weather").html("");
        $("#forecast").html("")

        var lat = $('#lat').val();
        var lon = $('#lon').val();

        getCurrent(lat, lon);
        getForecast(lat, lon);

        $("#weather").addClass('weather');
        $("#forecast").addClass('forecast');
    });
});

/**
 *  Utilizes the api key and retrieves information 
 *  Appends the information to columns
 *  headers has a different tag than the details under the p tag
 * 
 */

function getCurrent(lat, lon){
    $.ajax({
        url: "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&key=fe34f785ddd3406dbbf202145191203", success:function (data){

        $("#weather").append("<h3>" + 'Temperature' + "</h3>");
        $("#weather").append("<p> Current:" + data.current.temp_c + "°C </p>");
        $("#weather").append("<p> Low: " + data.forecast.forecastday[0].day.mintemp_c + "°C </p>");
        $("#weather").append("<p> High: " + data.forecast.forecastday[0].day.maxtemp_c + "°C </p>");
        $("#weather").append("<p> Feels like: " + data.current.feelslike_c + "°C </p>");
        
        $("#weather").append("<h3>" + "Condition:" + "</h3>")
        $("#weather").append("<p> Type: " + data.current.condition.text+ "</p>");
        $("#weather").append("<p> Cloud Cover: " + data.current.cloud + "% </p>");
        $("#weather").append("<p> Humidity: " + data.current.humidity + "% </p>");
        $("#weather").append("<p> Pressure: " + data.current.pressure_mb + "mB </p>");

        $("#weather").append("<h3>"+ "Wind:" + "</h3>");
        $("#weather").append("<p> Direction: " + data.current.wind_dir + "° </p>");
        $("#weather").append("<p> Speed: " + data.current.wind_kph + "km/h </p>");
        }
    });
}

/**
 * 
 * Same as the function above, but goes through a for loop to append information
 *  from the next days
 * 
 * 
 */

function getForecast(lat, lon){
    $.ajax({
        url: "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&days=7&key=fe34f785ddd3406dbbf202145191203", success:function (data){
            console.log("Forecast for next 7 days");
            $("#forecast").append("<br /><h3>"+ "Forecast: " + "</h3><br />");
            $("#forecast").append("<table id='TABLE'>");
            $("#TABLE").append("<tr><th>" + "&ensp;" + 'Date' + "</th>" + 
                                  "<th>" + 'Conditions' + "</th>" + 
                                  "<th>" + 'High' + "</th>" + 
                                  "<th>" + "Low" + "</th>" + 
                                  "<th>" + 'Wind' + "</th>" + 
                                  "<th>" + 'Outlook' + "</th></tr>");
            
            for (let i = 0; i < data.forecast.forecastday.length; i++){
                $("#TABLE").append("<tr><td>"+ "&ensp;" + data.forecast.forecastday[i].date + "</td>" + 
                `<td><img src="https://${data.forecast.forecastday[i].day.condition.icon}" /></td>` + 
                "<td>" + data.forecast.forecastday[i].day.maxtemp_c + "°C </td>" + 
                "<td>" +data.forecast.forecastday[i].day.mintemp_c + "°C </td>" + 
                "<td>" +  data.forecast.forecastday[i].day.maxwind_kph + "km/h </td>" + 
                "<td>" + data.forecast.forecastday[i].day.condition.text + "</td></tr>");
            }
            $("#forecast").append("</table>");
        }
    });
}
