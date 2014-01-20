var WEATHER = window.WEATHER || {};

WEATHER.LocationApp = (function($) {

    // weatherlocationObject
    var wl = {},

    // default config
    defaultConfig = {
        // this will contain defaults like urls etc
        parentWrapper: '#get_location',
        wunderground_url: 'http://api.wunderground.com/api/51c27f40bbfecefc/'
    },

    // Messages
    message = {
        errorLocation: 'Please choose another location or check your spelling',
        geoLocationError: 'Geolocation is not supported in your browser'
    },

    initDeferred = $.Deferred();

    // user options
    wl.config = {};

    //  can extend config with user defined options
    wl.init = function(options) {
        // call config
        this.config = $.extend({}, defaultConfig, options || {});
        this.bindHandlers();
    };

    // bindhandlers
    wl.bindHandlers = function(){
        var parentWrapper = this.config.parentWrapper, parent = this;
        // TODO: bind all event handlers here 
        $(parentWrapper).on('click', '#checkGeoLocation', function(e){ parent.checkGeoLocation(e); });
        $(parentWrapper).on('click', '#locationButton', function() { parent.processLocation(); });
    };


    /**
    * gets users geolocation data if checked
    * returns: string
    */
    wl.checkGeoLocation = function(e){
        $target = $(e.target);
        var isChecked = $target.is(':checked');

        if (isChecked === true) {
            this.currentGeolocation();
        }
    };


    /**
    * Gets users current location
    * returns: undefined
    */
    wl.currentGeolocation = function(){
        // check for browser support
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                    var userCoordinates = position.coords.latitude + ',' + position.coords.longitude;
                    wl.geoLocationData(userCoordinates);
                }
            );

        } else {
            $('.empty_field_error').text(message.geoLocationError).fadeIn();
            setTimeout(function(){
                $(".empty_field_error").fadeOut(300);
            }, 3000);
        }
    };

    /**
    * uses current location to pass to wunderground api to find closest weather station
    */
    wl.geoLocationData = function(latLong){

        var userLocationUrl = this.config.wunderground_url + 'geolookup/q/' + latLong + ".json?callback=?";

        if (userLocationUrl !== undefined) {
            $(".empty_field_error").hide();

            $.ajax({
                url: userLocationUrl,
                dataType: 'jsonp',
                statusCode: {
                    // TODO: enter status codes here
                }
            }).done(function(data){

                // same problem at work - need to understand deferreds better
                // when the deferred is resolved then the done callbacks are called
                //  so the deferred needs to be the currentGeolocation and the doen callback needs to be 
                console.log("data", data);
            var weather_html = ("<h3>Results of " + data.location.city + "</h3>" + '<img src="http://icons.wxug.com/logos/PNG/wundergroundLogo_black_horz.png" width="200"</img>');

            $('#returned_data').append(weather_html);

            });

        } else {
            $(".empty_field_error").fadeIn();
            setTimeout(function(){
                $(".empty_field_error").fadeOut(300);
            }, 3000);
        }
    };

    // for user input field
    wl.processLocation = function() {
        var location_input = $('#location_name').val(),
            locationUrl = this.config.wunderground_url + 'conditions/q/' + location_input + ".json?callback=?";


        if (location_input === '') {
            $(".empty_field_error").fadeIn();
            setTimeout(function(){
                $(".empty_field_error").fadeOut(300);
            }, 3000);
        } else {
            $(".empty_field_error").hide();
            // url including base url with api key and query type, datatype is jsonp
            $.ajax({
                url: locationUrl,
                dataType: 'jsonp',
                statusCode: {
                    // TODO: enter status codes here
                }
            }).done(function(data){
                wl.renderLocation(data);
            });
        }
    };

    // TODO: add a link for ski specific wunderground page: http://www.wunderground.com/ski/wa/stevens_pass_resort.html
    // TODO: create a drop down for "did you mean these locations" for response when not a direct hit but still given a resonse
    wl.renderLocation = function(data) {
        if (data.current_observation !== undefined) {
            var weather_html;

            // console.log(data);
            // when there is a reponse but no match it returns undefined for data.current_observation
            
            //  TODO: use handelbar templates and expressions
            weather_html = ("<h3>Results of " + data.current_observation.display_location.city +
            "</h3>"  + "<p>Temperature: " + data.current_observation.temp_f + "</p>" +
            "<p>Current Weather: " + data.current_observation.weather + "</p>" + "<p>Wind Gusts: " +
            data.current_observation.wind_mph + "mph</p>" + '<img src="http://icons.wxug.com/logos/PNG/wundergroundLogo_black_horz.png" width="200"</img>');

            $('#returned_data').append(weather_html);
                
            $('#location_name').focus(function() {
                 $(this).val('');
                 $('#returned_data').detach();
            });
        } else {
            $(".empty_field_error").fadeIn();
            setTimeout(function(){
                $(".empty_field_error").fadeOut(300);
            }, 3000);
        }
    };
        
    return wl;

})(jQuery);

jQuery(document).ready(function($){
    "use strict";
    WEATHER.LocationApp.init();
});
