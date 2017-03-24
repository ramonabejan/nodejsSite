var Profile = require("./profile.js");

var renderer = require("./renderer.js");

var querystring = require("querystring");


function home(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	renderer.view('header',{},response); 
	if(request.url==="/"){
		if(request.method.toLowerCase() === "get") {
			renderer.view('search',{},response);
	  		renderer.view('footer',{},response);
	  		response.end();
		}
		//post; we sent the search form 
		else {
			var body = [];
			request.on('data', function(chunk) {
			  body.push(chunk);
			}).on('end', function() {
			  body = Buffer.concat(body).toString();
			  request.method="GET";
			  var query=querystring.parse(body);
			  request.url = request.url + query.username;
			  
			  user(request,response);
			 
			});
			
		}	  
	  
	}

}

function user(request,response){
	var username = request.url.replace("/","");
	
	if(username.length > 0){
		mergeProfileInfo(response,username);
	}
	

}


function mergeProfileInfo(response,username){
	var studentProfile = new Profile(username);
	
	/**
		* When the JSON body is fully recieved the 
		* the "end" event is triggered and the full body
		* is given to the handler or callback
	**/

	studentProfile.on("end", function(userProfile){
		
		var values = { 
			avatarUrl: userProfile.gravatar_url,
			username: userProfile.profile_name,
			badges: userProfile.badges.length,
			javascriptPoints: userProfile.points.JavaScript
		}

		renderer.view('profile',values,response);

		response.end();
		
	});

	/**
		* If a parsing, network or HTTP error occurs an
		* error object is passed in to the handler or callback
	**/
	studentProfile.on("error", function(error){
		
		renderer.view('error',{errorMessage:error.message},response);			
		renderer.view('search',{},response);
		response.end();
	});


}





module.exports.home=home;

module.exports.user=user;