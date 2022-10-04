/*
* Primary file for API
*
*/

//dependancies
const http = require('http');

//server should respond to all requests with a sting 
const server = http.createServer(function(req,res){
    res.end('Hello World\n')
})

//start the server, have it listen on port 3000 ? 
server.listen(3000,function(){
    console.log('Server is listening on port 3000 now')
})