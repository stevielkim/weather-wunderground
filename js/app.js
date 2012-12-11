$(function(){
    // first user enters data then clicks button to retrieve data
    "use strict";


    $('#find').click(function(){
        var $this = $(this);
        var location_input = $('#name').val();
        var base_url = "http://api.wunderground.com/api/51c27f40bbfecefc/conditions/q/";
        var j = ".json";

        if(location_input === "undefined" || location_input === '' ){
            $(".empty_field_error").show();

        }
        else {
            $(".empty_field_error").hide();
            // url including base url with api key and query type, datatype is jsonp
            $.jsonp({
                //the location_select should bring the value
                url: base_url + location_input + j + "?callback=?",

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
                    // clears if full
                    returned_data.empty();
                    returned_data.html("<h3>Results of " + current.name_location +
                    "</h3>"  + "<p>Temperature: " + current.temp_f + "</p>" +
                    "<p>Current Weather: " + current.weather + "</p>" + "<p>Wind Gusts: " +
                    current.wind_mph + "mph</p>");
                }
            });
        }
    });
});
