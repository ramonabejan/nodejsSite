//Function that handles the reading from file and merge in values 
const fs = require('fs');

function mergeValues(values, contentFileTemplate){

	for(var key in values) {
		contentFileTemplate = contentFileTemplate.replace("{{"+key+"}}",values[key]);
	}
	return contentFileTemplate;
}

function view(templateName, values, response){
	//Read from the template file
	var contentFileTemplate = fs.readFileSync("./views/" + templateName + ".html",{encoding:'utf8'});

	//Insert values
	contentFileTemplate = mergeValues(values, contentFileTemplate);

	//write out the content to the response
	response.write(contentFileTemplate);

}



module.exports.view = view;




