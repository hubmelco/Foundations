/**
 * Creates the tickets endpoint for users to create, read, update, and delete reimbursement tickets
 * 
 * @param {*} app The express server application
 */
const ticketService = (app) => {
    const initialTicketObjectIdea = {
        amount: 0,
        description: "string",
        status: "maybe ints (0, 1, 2) or strings 'Pending', 'Approved', 'Denied'",
        type: "ints or strings",
        receipts: ["image blobs (Yuck, maybe not)"]
    }

    //Add request (create) endpoint
    //Add view (get) endpint--must be filterable
    //Add approve/deny (update) endpoint--Can only update if pending status
    app.get("/tickets", (req, res) => {
        return res.json("Hello, Tickets!");
    })
}

module.exports = ticketService;