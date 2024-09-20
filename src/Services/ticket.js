const uuid = require("uuid");

const ticketDAO = require("../Repository/ticketDAO");

const createTicket = async (username, info) => {
    const {amount, description} = info;
    if (amount <= 0) {
        return {message: "Invalid amount quantity. Must be greater than 0", data: false} // falsy value for repo check
    }
    const ticket = {
        id: uuid.v4(),
        class: "ticket",
        username,
        amount,
        description
    }
    await ticketDAO.createTicket(ticket);
    return {message: "Ticket Created", data: ticket};
}

module.exports = {createTicket};