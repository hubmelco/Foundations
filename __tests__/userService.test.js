const userDAO = require("../src/Repository/userDAO.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {createUser, updateUser} = require("../src/Services/user.js");

jest.mock("../src/Repository/userDAO.js");
jest.mock("uuid");
jest.mock("bcrypt");

beforeEach(() => {
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
            role: "employee"
        }
        userDAO.getUserByUsername.mockResolvedValueOnce(undefined);
        const {message, data} = await createUser(info);

        expect(data).toEqual(expected);
        expect(message).toBeDefined();
    })

    test("Username already in use error", async () => {
        const info = {username: "jonathan", password: "123"};
        userDAO.getUserByUsername.mockResolvedValueOnce("truthy value");
        const {message, data} = await createUser(info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })
})

describe("Tests for updating a users role", () => {
    test("Tests a valid call to update user", async () => {
        const id = "1";
        const role = "manager";

        const {message, data} = await updateUser(id, role);

        expect(data).toEqual({id, role});
        expect(message).toBeDefined();
    })

    test("Tests a invalid call to update user with bad role", async () => {
        const id = "1";
        const role = "invalid";

        const {message, data} = await updateUser(id, role);

        expect(data).toBeFalsy();
        expect(message).toBeDefined();
    })
})