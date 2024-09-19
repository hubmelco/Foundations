const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {login} = require("../src/Services/login.js");
const {getUserByUsername} = require("../src/Repository/userDAO.js");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../src/Repository/userDAO.js");

beforeEach(() => {
    jwt.sign.mockImplementation((a, b) => {return "SOME STRING";});
    bcrypt.compare.mockImplementation((password, hash) => {return password === hash});
})

afterEach(() => {
    jest.clearAllMocks();
})

describe("Tests the functionality of logging in", () => {
    test("a successful login call", async () => {
        const info = {
            username: "jonathan",
            password: "123"
        }

        getUserByUsername.mockResolvedValue({username: "jonathan", role: "Employee", password: "123", id: 1});
        const {message, data} = await login(info);

        expect(jwt.sign).toHaveBeenCalled();
        expect(data.token).toBe("SOME STRING");
        expect(message).toBeDefined();
    })

    test("an invalid password", async () => {
        const info = {
            username: "jonathan",
            password: "1234"
        }

        getUserByUsername.mockResolvedValue({username: "jonathan", role: "Employee", password: "123", id: 1});
        const {message, data} = await login(info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined(); // --> "Incorrect password"
    })

    test("an invalid username", async () => {
        const info = {
            username: "joe",
            password: "1234"
        }

        getUserByUsername.mockResolvedValue(undefined);
        const {message, data} = await login(info);

        expect(data).toBeFalsy();
        expect(message).toBeDefined(); // --> "User with username \"joe\" does not exist"
    })
})