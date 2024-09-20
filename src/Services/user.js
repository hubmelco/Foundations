const userDAO = require("../Repository/userDAO.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const createUser = async (info) => {
    const {username, password} = info;
    const user = {
        class: "user",
        id: uuid.v4(),
        username,
        role: "employee"
    }
    const data = await userDAO.getUserByUsername(username);
    if (data) {
        return {message: "Username already in use", data: false}; // falsy value to say user was not created
    }
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await userDAO.createUser(user);
    delete(user.password); //Delete password field before sending back
    return {message: "User created", data: user};
}

module.exports = {createUser}