
//stablish connection
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log("connected to server");
});

socket.on('disconnect', function () {
    console.log("Desconnect from the server");
});

socket.on('currentTicket', function(data){
    if (data.curentTicket){
        label.text(data.curentTicket);
    }
});

$('button').on('click',function(){
    console.log("click");
    socket.emit('nextTicket',null, function(nextTicket){
       label.text(nextTicket);
    });
});