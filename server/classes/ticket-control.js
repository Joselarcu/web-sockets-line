
const fs = require('fs');

class Ticket{
    constructor(number, table){
        this.number = number;
        this.table = table;
    }
}

class TicketControl{

    constructor(){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];

        this.last4  = [];

        let data = require('../data/data.json');
        console.log(data);

        if(data.today === this.today){
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else{
            this.restartCounter();
            this.tickets = [];
        }
    }

    next(){
        this.last += 1;
        let ticket = new Ticket(this.last,null);
        this.tickets.push(ticket);
        this.writeFile();

        return "Ticket " + this.last;
    }

    getLastTicket(){
        return "Ticket " + this.last;
    }
    getLast4Tickets() {
        return this.last4;
    }

    attendTicket(table){
        if(this.tickets.length === 0 ){
            return 'No tickets';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(ticketNumber,table);
        this.last4.unshift(attendTicket);

        if(this.last4.length > 4){
            this.last4.splice(-1,1);//delete last element
        }
        console.log('Last 4',this.last4);
        this.writeFile();
        return attendTicket;
    }

    restartCounter(){
       this.last = 0;
       this.tickets = [];
       this.last4 = [];
       this.writeFile();
    }

    writeFile(){
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('../server/data/data.json', jsonDataString);
        console.log("Initialize system");
    }
}

module.exports = {TicketControl}