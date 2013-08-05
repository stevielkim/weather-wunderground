(function($) {
    "use strict";
    $('#find').on('click', function() {

        var location_input = $('#location_name').val(),
            base_url =  "http://api.wunderground.com/api/51c27f40bbfecefc/conditions/q/",
            j = ".json";

        function errors() {
            $(".empty_field_error").show();
        }

        if (location_input === '') {
            errors();
        } else {
            $(".empty_field_error").hide();
            // url including base url with api key and query type, datatype is jsonp
            $.ajax({
                type: 'GET',
                url: base_url + location_input + j + "?callback=?",
                dataType: 'jsonp',
                statusCode: {
                    // 404's etc
                },

                 // Success callback function returning specific data results
                 // from Wunderground API in jsonp format & is inserted in
                 // the DOM
                success: function(data) {

                    if (data.current_observation !== undefined) {

                        // console.log(data);
                        // when there is a reponse but no match it returns undefined for data.current_observation
                        
                        var current = {
                            name_location: data.current_observation.display_location.city,
                            temp_f: data.current_observation.temp_f,
                            weather: data.current_observation.weather,
                            wind_mph: data.current_observation.wind_mph
                        },
                        returned_data = $('#returned_data');
                        returned_data.html("<h3>Results of " + current.name_location +
                        "</h3>"  + "<p>Temperature: " + current.temp_f + "</p>" +
                        "<p>Current Weather: " + current.weather + "</p>" + "<p>Wind Gusts: " +
                        current.wind_mph + "mph</p>");
                            
                        $('#location_name').focus(function() {
                             $(this).val('');
                             returned_data.detach();
                        });
                    } else {
                        errors();
                    }
                }
            });
        }

    });
})(jQuery);
