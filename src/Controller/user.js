const express = require("express");
const router = express.Router();

const {createUser, getUserByUsername} = require("../Services/user.js");
const logger = require("../Util/logger.js");

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    if (!username) {
        return res.status(400).json({message: "username must be provided in body"});
    }
    if (!password) {
        return res.status(400).json({message: "password must be provided in body"});
    }
    try {
        const {message, data} = await createUser(req.body);
        return data ? res.status(201).json({message, data}) : res.status(400).json({message, data: {username}});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({message: "Unexpected Server Error"});
    }
})

module.exports = router;