const express = require("express");

const {createTicket, updateTicket} = require("../Services/ticket.js");
const logger = require("../Util/logger.js");
const { authenticate, adminAuthenticate } = require("../Middleware/auth.js");

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

router.put("/:id", adminAuthenticate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({message: "status must be provided in body"});
    }
    try {
        const {message, data} = await updateTicket(id, status);
        return data ? res.status(200).json({message, data}) : res.status(400).json({message, data: {id, status}});
    } catch (err) {
        logger.error(err);
        res.status(500).json("Unexpected server error");
    }
})

module.exports = router;