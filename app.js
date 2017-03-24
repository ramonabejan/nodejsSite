//1. Create a web server

var router = require('./router.js');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((request, response) => {
	 router.home(request,response);
	 router.user(request,response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



//2. Handle HTTP route GET/ and POST

//3. Handle HTTP route GET/:username

//4. Function that handles the reading of files and merge in value

