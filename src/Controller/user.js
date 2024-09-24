const express = require("express");
const router = express.Router();

const {createUser, updateUser} = require("../Services/user.js");
const logger = require("../Util/logger.js");
const {authenticate, adminAuthenticate} = require("../Middleware/auth.js");

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

router.put("/:id", adminAuthenticate, async (req, res) => {
    const {id} = req.params;
    const {role} = req.body;
    if (!role) {
        return res.status(400).json({message: "role must be provided in body"});
    }
    try { 
        const {message, data} = await updateUser(id, role.toLowerCase());
        return data ? res.status(200).json({message, data}) : res.status(400).json({message, data: {id, role}});
    } catch (err) {
        logger.error(err);
        return res.status(500).json({message: "Unexpected Server Error"});
    }
})

module.exports = router;