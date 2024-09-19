const express = require("express");
const router = express.Router();

const logger = require("../Util/logger.js");

const {login} = require("../Services/login.js")

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    if (!username) {
        return res.status(400).json({message: "username required in body to login"});
    }
    if (!password) {
        return res.status(400).json({message: "password required in body to login"});
    }
    try {
        const {message, data} = await login(req.body);
        return data ? res.status(200).json({message, data}) : res.status(400).json({message, data: req.body});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({message: "Unexpected Server Error"});
    }

});

module.exports = router;