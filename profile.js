var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {

    EventEmitter.call(this);

    var profileEmitter = this;

    //Connect to the API URL (https://teamtreehouse.com/username.json)
    var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
           
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Listen for the 'data event
        response.on("data", function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        //Listen for the 'end' event
        response.on("end", function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                   
                } catch (error) {
                    profileEmitter.emit("error", error);
                 
                }
            }

        });

        response.on("error", function(error){
            
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

module.exports = Profile;