/*
* Primary file for API
*
*/

//dependancies
const http = require('http');
const url = require('url');

//server should respond to all requests with a sting 
const server = http.createServer(function(req,res){

    //get url and parse it
    const parsedUrl = url.parse(req.url, true); //true uses query string module that works with url module

    //get path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\+|\/+$/g,'');  // trims Regular Expressions except in the middle of strings  (g searches globally the expressions instead if stopping at the first instance found)


    //get the http method
    const method = req.method.toLowerCase();

    //send response
    res.end('Hello World\n');

    //log the request oath
    console.log('Request received on path: '+ trimmedPath+ ' with this method: ' + method);
    
})

//start the server, have it listen on port 3000 ? 
server.listen(3000,function(){
    console.log('Server is listening on port 3000 now');
})