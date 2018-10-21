var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error("The tabe is neccesary");
}

var table = searchParams.get('escritorio');
var label = $('small');
console.log("Table", table);

$('h1').text('Table ' + table);

$('button').on('click',function(){
    socket.emit('attendTicket', {table: table}, function(response){
        console.log(response);
        if (response === 'No tickets'){
            label.text(response)
            alert(response);
            return;
        }
        label.text("Ticket " + response.number);
    });
});
