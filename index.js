/*
* Primary file for API
*
*/

//dependancies
const http = require('http');
const url = require('url')

//server should respond to all requests with a sting 
const server = http.createServer(function(req,res){

    //get url and parse it
    const parsedUrl = url.parse(req.url, true); //true uses query string module that works with url module

    //get path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\+|\/+$/g,'')  // trims Regular Expressions except in the middle of dtrings

    //send response
    res.end('Hello World\n')

    //log the request oath
    console.log('Request received on path: '+ trimmedPath);
    
})

//start the server, have it listen on port 3000 ? 
server.listen(3000,function(){
    console.log('Server is listening on port 3000 now')
})