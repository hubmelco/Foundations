const express = require("express");

const {createTicket} = require("../Services/ticket.js");
const logger = require("../Util/logger.js");
const { authenticate } = require("../Middleware/auth.js");

const router = express.Router();

router.use(authenticate);

router.post("/", async (req, res) => {
    const {amount, description} = req.body;
    const {username} = res.locals.user
    if (!amount) {
        return res.status(400).json({message: "amount must be provided in body"});
    }
    if (!description) {
        return res.status(400).json({message: "description must be provided in body"});
    }
    try {
        const {message, data} = await createTicket(username, req.body);
        return data ? res.status(201).json({message, data}) : res.status(400).json({message, data: {amount}});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({message: "Unexpected server error"});
    }
})

module.exports = router;