$(function(){
    "use strict";

    // change method goes through all of the selected lists
    $("#location").change(function(){
        // try to make this an object literal with sessionStorage
        var location_select = $(this).val();
        var base_url = "http://api.wunderground.com/api/51c27f40bbfecefc/conditions/q/";
        var j = ".json";

        // url including base url with api key and query type, datatype is jsonp
        $.jsonp({

            //the location_select should bring the value
            url: base_url + location_select + j + "?callback=?",

             // Success callback function returning specific data results
             // from Wunderground API in jsonp format & is inserted in
             // the DOM
            success: function(data){
                // create object literal
                var current = {
                    name_location: data.current_observation.display_location.city,
                    temp_f: data.current_observation.temp_f,
                    weather: data.current_observation.weather,
                    wind_mph: data.current_observation.wind_mph
                };
                var returned_data = $('#returned_data');
                returned_data.html("<h3>Results of " + current.name_location +
                "</h3>"  + "<p>Temperature: " + current.temp_f + "</p>" +
                "<p>Current Weather: " + current.weather + "</p>" + "<p>Wind Gusts: " +
                current.wind_mph + "mph</p>");
            }
        });
        
    });
});