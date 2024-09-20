const ticketDAO = require("../src/Repository/ticketDAO.js");
const uuid = require("uuid");

const { createTicket } = require("../src/Services/ticket.js");

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
})