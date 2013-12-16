var WEATHER = window.WEATHER || {};

WEATHER.LocationApp = (function($) {

    // weatherlocationObject
    var wl = {};

    // default config
    var defaultConfig = {
        // this will contain defaults like urls etc
        getLocationWrapper: '#get_location',
        wunderground_url: 'http://api.wunderground.com/api/51c27f40bbfecefc/conditions/q/'
    };

    // Messages
    var message = {
        errorLocation: 'Please choose another location or check your spelling',
        geoLocationError: 'Geolocation is not supported in your browser'
    };

    // currently used config
    wl.config = {};

    wl.init = function() {
        // call config
        this.bindHandlers();
    };

    // bindhandlers
    wl.bindHandlers = function(){
        // TODO: bind all event handlers here 
        $('#find').on('click', function() { wl.processLocation(); });
    };

    // clean up by not nesting the callback
    $('#check_location').on('click', function(){
        var isChecked = $(this).is(':checked');
        wl.getGeoLocation(isChecked);
    });

    wl.getGeoLocation = function(isChecked){
        if (isChecked === true) {
            wl.geolocation();
        }
    };

    wl.geolocation = function(){
        // check for browser support
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(wl.showPosition);
               
        } else {
             $('.empty_field_error').text(message.geoLocationError);
        }
    };

    // get current position with geolocation api
    // pass in the longitude and latitude to the api url
    // TODO: make a checkbox asking if the user wants to use their current location to match the nearest mountain
    wl.showPosition = function(position) {
        console.log(position);
        console.log('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);
    };
// TODO: click should be on parent, then pass in #find 
// TODO: call function for click event to run
    // $('#find').on('click', function() { });


    wl.processLocation = function() {
        var location_input = $('#location_name').val(),
            locationUrl = defaultConfig.wunderground_url + location_input + ".json?callback=?";


        if (location_input === '') {
            $(".empty_field_error").show();
        } else {
            $(".empty_field_error").hide();
            // url including base url with api key and query type, datatype is jsonp
            $.ajax({
                url: locationUrl,
                dataType: 'jsonp',
                statusCode: {
                    // TODO: enter status codes here
                },

                 // Success callback function returning specific data results
                 // from Wunderground API in jsonp format & is inserted in
                 // the DOM
                success: function(data) {
                    wl.renderLocation(data);
                }
            });
        }
    };

    wl.renderLocation = function(data) {
        if (data.current_observation !== undefined) {

            // console.log(data);
            // when there is a reponse but no match it returns undefined for data.current_observation
            

            //  TODO: use handelbar templates and expressions
            $('#returned_data').html("<h3>Results of " + data.current_observation.display_location.city +
            "</h3>"  + "<p>Temperature: " + data.current_observation.temp_f + "</p>" +
            "<p>Current Weather: " + data.current_observation.weather + "</p>" + "<p>Wind Gusts: " +
            data.current_observation.wind_mph + "mph</p>");
                
            $('#location_name').focus(function() {
                 $(this).val('');
                 returned_data.detach();
            });
        } else {
            $(".empty_field_error").show();
        }
    };
        
    return wl;

})(jQuery);

jQuery(document).ready(function($){
    "use strict";
    WEATHER.LocationApp.init();
});
