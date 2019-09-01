var static = require('node-static');
var port = 8000;
var file = new static.Server('./blog/dist/blog');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(port, () => {
    console.log("Server Running on Port "+port);
});