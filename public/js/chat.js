//Connect with websocket
//var socket = io.connect("http://localhost:4000");
var socket = io.connect("http://christyyau.com");


//DOM
var keyInput = document.querySelc
var msg = document.getElementById("msg");
var username = document.getElementById("username");
var send = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

//Emit Events
msg.addEventListener("keypress", function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        socket.emit("IM", {
            msg: msg.value,
            username: username.value
        });
        msg.value = "";
    }
    socket.emit('feedback', username.value);

});


send.addEventListener("click", function () {
    socket.emit("IM", {
        msg: msg.value,
        username: username.value
    });
    msg.value = "";

});


//Listening
socket.on("IM", function (data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.username + ":</strong> " + data.msg + "</p>";
})

socket.on("feedback", function(data) {
    feedback.innerHTML = "<p><i>" + data + " is typing...</i></p>";
});