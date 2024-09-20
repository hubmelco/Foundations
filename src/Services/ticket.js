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
        description,
        status: "pending"
    }
    await ticketDAO.createTicket(ticket);
    return {message: "Ticket Created", data: ticket};
}

const updateTicket = async (id, status) => {
        const ticket = await ticketDAO.getTicketById(id);
        if (!ticket) {
            return {message: "Ticket not found", data: false};
        }
        if (ticket.status !== "pending") {
            return {message: "ticket already closed, cannot be modified", data: false};
        }
        if (status !== "approved" && status !== "denied") {
            return {message: "Invalid ticket status, must be 'approved' or 'denied'", data: false};
        }
        await ticketDAO.updateTicket(id, status);
        return {message: "Updated ticket status", data: {id, status}};
}

module.exports = {createTicket, updateTicket};