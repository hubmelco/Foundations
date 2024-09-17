const express = require("express");
const cors = require("cors");

const userService = require("./Services/User/user.js");
const ticketService = require("./Services/Ticket/ticket.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Open up endpoints
userService(app);
ticketService(app);

app.listen(port, () => {
  console.log(`Foundations app server located on http://localhost:3000`);
})