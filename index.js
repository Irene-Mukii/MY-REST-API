/*
* Primary file for API
*
*/

//dependancies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder; //why the .StringDecoder ------------------------------------------------***********

//server should respond to all requests with a sting 
const server = http.createServer(function(req,res){

    //get url and parse it
    const parsedUrl = url.parse(req.url, true); //true (converts query string into key pair values) --from querystring inbuilt module

    //get path 
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');  // trims Regular Expressions except in the middle of strings  (g searches globally the expressions instead if stopping at the first instance found)

    //get query string as an object
    let queryStringObject = parsedUrl.query;

    //get the http method
    const method = req.method.toLowerCase();

    //get the headers as an object
    const headers = req.headers;

    //get payload (info trying to be put in server for display or reading)if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',function(data){   //--------understand where data and end is coming from ------------------------------------------------****

// The request object is an EventEmitter object. As such, it emits events and anyone can add listeners for those events.

// In the case of the request object, it emits events that correspond with networking. The data event is emitted when some data has arrived (from the request body). If you have more than one listener for the data event, then each listener will see each data event with the exact same data.

// The end event is emitted where there is no more data to from the request body (all data has arrived).

// Until you attach some means of reading the data from the incoming request (such as a data event listener), the data is queued and will be held in memory. This gives you a chance to attach the listener even after the data has already started arriving without any worry about missing any of the data. In node.js, many streams work this way. Data doesn't start flowing through the listeners until you attach at least one listener for the data.

        buffer += decoder.write(data);
    });
    req.on('end', function (){
        buffer += decoder.end();

        //choose handler request should go to...if not existing go to notfound handlers
        const chosenHandler =  typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        //construct data object to send to handler
        const data = {
            'trimmedPath':  trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        //route request to specified handler
        chosenHandler(data,function(statusCode,payload){
            //Use the status code called back or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;            
            //use payload called back or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // convert payload object to string
            const payloadString = JSON.stringify(payload);

            //return response
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode);
            res.end(payloadString);

            //log the request path
            console.log('Returning this response; ', statusCode,payloadString);
        });

        //send response
        

    });
  
});

//start the server, have it listen on port 3000 ? 
server.listen(3000,function(){
    console.log('Server is listening on port 3000 now');
});

//Define handlers
let handlers = {};

handlers.sample = function(data,callback){
//call back a http status code and a payload object
callback(406,{'name' : 'sample handler'} )
};

//not found handler
handlers.notFound = function(data,callback){
callback(404);
};


//Define a request router
const router = {
    'sample' : handlers.sample
};

