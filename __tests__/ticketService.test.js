const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb");
const uuid = require("uuid");

const { createTicket } = require("../src/Services/ticket.js");

jest.mock("@aws-sdk/client-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");
jest.mock("uuid");


beforeEach(() => {
    DynamoDBDocumentClient.from.mockReturnValue({send: jest.fn()});
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
        }

        const expected = {
            id: 1,
            class: "ticket",
            username: "jonathan", //Hard coded in until JWT is implemented (in which case we use a mock)
            amount: info.amount,
            description: info.description,
        }

        const {message, data} = await createTicket(info);

        expect(data).toEqual(expected);
        expect(message).toBeDefined();
    })

    test("Invalid ticket amount (0)", async () => {
        const info = {
            amount: 0,
            description: "test"
        }

        const {message, data} = await createTicket(info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })

    test("Invalid ticket amount (negative)", async () => {
        const info = {
            amount: -5,
            description: "test"
        }

        const {message, data} = await createTicket(info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })
})