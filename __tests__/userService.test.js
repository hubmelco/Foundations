const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {createUser} = require("../src/Services/user.js");

jest.mock("@aws-sdk/client-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");
jest.mock("uuid");
jest.mock("bcrypt");

beforeEach(() => {
    DynamoDBDocumentClient.from.mockReturnValue({send: jest.fn()});
    uuid.v4.mockReturnValue(1);
    bcrypt.hash.mockImplementation((password) => password);
})

afterEach(() => {
    jest.clearAllMocks();
})

describe("Tests for creating a user", () => {    
    test("a successful createUser call", async () => {

        const info = {username: "jonathan", password: "123"};
        const expected = {
            class: "user",
            id: 1,
            username: "jonathan",
            role: "Employee"
        }

        const dbClient = DynamoDBDocumentClient.from();
        dbClient.send.mockResolvedValueOnce({Items: []});
        const {message, data} = await createUser(info);

        expect(data).toEqual(expected);
        expect(message).toBeDefined();

        // NOT A PART OF THIS TEST, JUST NEEDED TO CORRECTLY RUN NEXT TEST (weird thing with mocks carrying over to other tests)
        dbClient.send = jest.fn().mockResolvedValueOnce({Items: [{
            class: {S: "user"},
            username: {S: "jonathan"},
            id: {S: "1"},
            role: {S: "Employee"},
            password: {S: "123"}
        }]});
    })

    test("Username already in use error", async () => {
        const info = {username: "jonathan", password: "123"};
        // MOCK SETUP that doesn't work due to weird mock behaviour
        // const databaseData = {
        //     class: {S: "user"},
        //     username: {S: "jonathan"},
        //     id: {S: "1"},
        //     role: {S: "Employee"}
        // }
        // const dbClient = DynamoDBDocumentClient.from();
        // dbClient.send.mockResolvedValue({Items: [databaseData]});
        const {message, data} = await createUser(info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })
})