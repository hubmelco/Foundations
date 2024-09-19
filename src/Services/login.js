const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userDAO = require("../Repository/userDAO.js");

const login = async (info) => {
    const {username, password} = info;
    const user = await userDAO.getUserByUsername(username);
    if (!user) {
        return {message: `User with username "${username}" does not exist`, data: false};
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return {message: `Incorrect password`, data: false};
    }
    delete(user.password);
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return ({message: "Successfully logged in", data: {token}})
}

module.exports = {login};