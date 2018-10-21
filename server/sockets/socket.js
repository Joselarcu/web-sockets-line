const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control.js');

const ticketControl = new TicketControl();


io.on('connection', (client) => {
    console.log("User connected");
    client.on('nextTicket', (data,callback) =>{
        console.log("Next ticket?");
        let nextTicket = ticketControl.next();
        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit('currentTicket',{
        curentTicket: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4Tickets()
    });

    client.on('attendTicket',(data,callback) =>{
        if(!data.table){
            return callback({err: true, message:'Desk is required'});
        }
        let attendTicket = ticketControl.attendTicket(data.table);
        callback(attendTicket);

        client.broadcast.emit('last4', { last4: ticketControl.getLast4Tickets()});


    })

    /* console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // } 



    });*/

});