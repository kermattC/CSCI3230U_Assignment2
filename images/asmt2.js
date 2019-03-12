$.getJSON('http://api.apixu.com/v1/forecast.json?key=fe34f785ddd3406dbbf202145191203&q=Paris', function(data) {
    $.each(data, function(key, value) {
        console.log(key + ' ' + stuff);
    });
});