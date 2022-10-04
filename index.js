/*
* Primary file for API
*
*/

//dependancies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

//server should respond to all requests with a sting 
const server = http.createServer(function(req,res){

    //get url and parse it
    const parsedUrl = url.parse(req.url, true); //true (converts query string into key pair values) --from querystring inbuilt module

    //get path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\+|\/+$/g,'');  // trims Regular Expressions except in the middle of strings  (g searches globally the expressions instead if stopping at the first instance found)

    //get query string as an object
    let queryStringObject = parsedUrl.query;

    //get the http method
    const method = req.method.toLowerCase();

    //get the headers as an object
    const headers = req.headers;

    //get payload (info trying to be put in server for display or reading)if any
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function (){
        buffer += decoder.end();

    //send response
    res.end('Hello World\n');

    //log the request oath
    console.log('Request received with these payload; ', buffer);

    });


    
})

//start the server, have it listen on port 3000 ? 
server.listen(3000,function(){
    console.log('Server is listening on port 3000 now');
})