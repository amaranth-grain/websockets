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
/*
When enter key is pressed in the message window, emit message and
feedback data to socket and reset the value to "".
*/
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

/* When 'Send' button is clicked, emit message and
feedback data to socket and reset the value to "".
 */
send.addEventListener("click", function () {
    socket.emit("IM", {
        msg: msg.value,
        username: username.value
    });
    msg.value = "";

});


//Listening
/*After receiving data from server, reset the feedback message and
output the message that was typed to all clients.
*/
socket.on("IM", function (data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.username + ":</strong> " + data.msg + "</p>";
})

/*After receivnig feedback data from server, broadcast "x is typing"
to all clients except the typist.
*/
socket.on("feedback", function(data) {
    feedback.innerHTML = "<p><i>" + data + " is typing...</i></p>";
});