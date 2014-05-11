weather-wunderground
====================

##JQuery based use of wundergrounds weather API with JSONP

This is a very basic app in JavaScript that uses the HTML5 location API to get users location and returns the current weather from the Weather Wunderground API.

The main app is in app.js and index.html which has an input field that will take any location such as Crystal Mountain or Seattle and it returns the weather conditions based on the weather reported by the nearest weather station.  Also this is where I implemented the HTML5 geolocation API where the user can opt-in to use their location which is passed into the url of the Weather Wunderground GET request.

For the select.js and select.html there are ski locations hardcoded in the dropdown - this code was written a few years ago and is due for a refactor.
