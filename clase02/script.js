//HandLab TicketManager

class TicketManager{
    #precioBaseDeGanancia
    constructor(){
        this.events = []
        this.#precioBaseDeGanancia = 0.15
    }
    //Getter
    getEvents = () => {
        return this.events
    }

    getNextID = () => {
        const count = this.events.length
        return count > 0 ? this.events[count-1].id + 1 : 1
    }

    addEvent = (name, place, price, capacity, date) => {
        const id = this.getNextID()
        const event = {
            id,
            name,
            place,
            priceBase: price,
            price: price*(1 + this.#precioBaseDeGanancia),
            capacity: capacity ?? 50,
            date: date ?? new Date().toLocaleDateString(),
            participants: []
        }
        this.events.push(event)
    }

    addParticipant = (eventID, userID) => {
        const event = this.events.find(event => event.id === eventID)
        if (event == undefined) return -1
        if(!event.participants.includes(userID)){
            event.participants.push(userID)
            return 1
        }
        return -1
    }
    ponerEventoEnGira = (eventID, placeNew, dateNew) => {
        const event = this.events.find(event => event.id == eventID)
        const {name, priceBase, capacity} = event
        this.addEvent(name, placeNew, priceBase, capacity, dateNew)
    }
}


const ticketManager = new TicketManager()

ticketManager.addEvent('Bad Bunny', 'Medellin', 120, null, null)
ticketManager.addEvent('AC DC', 'Miami', 120, null, null)
ticketManager.addParticipant(1,100)
ticketManager.addParticipant(1,200)
ticketManager.ponerEventoEnGira(2, 'Buenos Aires', null)
console.log(ticketManager.events);