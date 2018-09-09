var express = require('express');
var socket = require('socket.io');

//Set-up application
var app = express();
var server = app.listen(4000, function(){
    console.log("Currently listening to requests on port 4000.");
});

//Static files
app.use(express.static("public"));

//Set-up socket
var io = socket(server);

//Call this function when connection is establisheed.
io.on('connection', function(socket){
    console.log("Socket " + socket.id + " has established connection.");

    //Handle chat event
    socket.on("IM", function(data){
        io.sockets.emit("IM", data);
    });

    //Handle feedback event (x is typing...)
    socket.on("feedback", function(data){
        socket.broadcast("feedback", data);
    });
});

