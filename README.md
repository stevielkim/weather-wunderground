weather-wunderground
====================

##JQuery based use of wundergrounds weather API with JSONP

This was my first attempt to play around with wundergrounds API 
You'll have to register your own API key and replace it in the app.js 
file.

The index.html file is for user input and so far I have not found a
way to handle errors with the API - the jsonp error function doesn't 
work nor does it seem to work with a custom error handler so if you 
know JavaScript or this API better than I do, go ahead start a branch,
do a pull request and then I can merge it back into master.

For the select.html file some of the results aren't accurate because
the longitude and latitude are wrong from what I've gathered online.
I'm going to simply call the resorts and get their exact location soon.
Also, I know I'm naughty for having my data in the DOM.  I am learning 
Backbone.js and will remedy this ASAP or someone could fork it and do
that too.

Everything is pretty much as unstyled as you can get because my point 
was to learn how to work with client-side APIs using JQuery and eventually
I'd like to add other features such as maps or webcams.
