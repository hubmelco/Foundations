const ticketDAO = require("../src/Repository/ticketDAO.js");
const uuid = require("uuid");

const { createTicket, updateTicket, getTickets, getPendingTickets } = require("../src/Services/ticket.js");

jest.mock("../src/Repository/ticketDAO.js");
jest.mock("uuid");


beforeEach(() => {
    uuid.v4.mockReturnValue(1);
})

afterEach(() => {
    jest.clearAllMocks();
})

describe("Tests for creating tickets", () => {
    test("A successful createTicket call", async () => {
        const info = {
            amount: 500,
            description: "test"
        };
        const username = "jonathan";

        const expected = {
            id: 1,
            class: "ticket",
            username: "jonathan",
            amount: info.amount,
            description: info.description,
            status: "pending"
        };

        const {message, data} = await createTicket(username, info);

        expect(data).toEqual(expected);
        expect(message).toBeDefined();
    })

    test("Invalid ticket amount (0)", async () => {
        const info = {
            amount: 0,
            description: "test"
        };
        const username = "test";

        const {message, data} = await createTicket(username, info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })

    test("Invalid ticket amount (negative)", async () => {
        const info = {
            amount: -5,
            description: "test"
        };
        const username = "test";

        const {message, data} = await createTicket(username, info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })

    test("Invalid ticket type", async () => {
        const info = {
            amount: 500,
            description: "test",
            type: "invalid"
        };
        const username = "test user";

        const {message, data} = await createTicket(username, info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })

    test("A successful createTicket call with type", async () => {
        const info = {
            amount: 500,
            description: "test",
            type: "food"
        };
        const username = "jonathan";

        const expected = {
            id: 1,
            class: "ticket",
            username: "jonathan",
            amount: info.amount,
            description: info.description,
            status: "pending",
            type: "food"
        };

        const {message, data} = await createTicket(username, info);

        expect(data).toEqual(expected);
        expect(message).toBeDefined();
    })
})

describe("Tests for updating ticket statuses", () => {
    test("A successful approved status update", async () => {
        const id = 1; 
        const status = "approved";
        const ticket = {
            status: "pending"
        }

        ticketDAO.getTicketById.mockResolvedValueOnce(ticket);
        const {message, data} = await updateTicket(id, status);

        expect(data).toEqual({id, status});
        expect(message).toBeDefined();
    })

    test("A successful denied status update", async () => {
        const id = 1; 
        const status = "denied";
        const ticket = {
            status: "pending"
        }

        ticketDAO.getTicketById.mockResolvedValueOnce(ticket);
        const {message, data} = await updateTicket(id, status);

        expect(data).toEqual({id, status});
        expect(message).toBeDefined();
    })

    test("An invalid ticket id", async () => {
        const id = "invalid";
        const status = "denied";

        ticketDAO.getTicketById.mockResolvedValueOnce(undefined);
        const {message, data} = await updateTicket(id, status);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })

    test("An invalid status type", async () => {
        const id = 1;
        const status = "invalid";

        ticketDAO.getTicketById.mockResolvedValueOnce({status: "pending"});
        const {message, data} = await updateTicket(id, status);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })
})

describe("Tests for getting ticket submissions", () => {
    test("Getting your own tickets", async () => {
        const username = "whatever" // Retrieved from JWT after verifying, should never be invalid

        ticketDAO.getTickets.mockResolvedValueOnce([]);
        const {message, data} = await getTickets(username);

        expect(data).toBeDefined()
        expect(message).toBeDefined();
    })

    test("Getting pending tickets", async () => {
        const username = "whatever" // Retrieved from JWT after verifying, should never be invalid

        ticketDAO.getPendingTickets.mockResolvedValueOnce([]);
        const {message, data} = await getPendingTickets(username);

        expect(data).toBeDefined()
        expect(message).toBeDefined();
    })

    test("Getting your own tickets by type", async () => {
        const username = "whatever"; // Retrieved from JWT after verifying, should never be invalid
        const query = {type: "food"};

        ticketDAO.getTickets.mockResolvedValueOnce([]);
        const {message, data} = await getTickets(username, query);

        expect(data).toBeDefined(); // DAO Mock would just return the mocked return object whatever it is
        expect(message).toBeDefined();
    })
})