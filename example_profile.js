var Profile = require("./profile.js");


var studentProfile = new Profile("cacat");

/**
* When the JSON body is fully recieved the 
* the "end" event is triggered and the full body
* is given to the handler or callback
**/


//=== studentProfile.on("end", console.dir);
studentProfile.on("end", function(userProfile){
		console.dir(userProfile);
		console.log("event 'end' triggered")
	}
);

/**
* If a parsing, network or HTTP error occurs an
* error object is passed in to the handler or callback
**/
studentProfile.on("error", console.error);