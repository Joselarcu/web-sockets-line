var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblTable1 = $('#lblEscritorio1');
var lblTable2 = $('#lblEscritorio2');
var lblTable3 = $('#lblEscritorio3');
var lblTable4 = $('#lblEscritorio4');


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblTables = [lblTable1, lblTable2, lblTable3, lblTable4];

socket.on('currentTicket', function(data){
    console.log("====>",data);
    updateHTML(data.last4) 

});

socket.on('last4',function(data){
    console.log("update last4");
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.last4);
})

function updateHTML(last4){
    console.log(last4)
    for(var i=0; i<= last4.length -1; i++){
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblTables[i].text('Tables ' + last4[i].table);
    }
}