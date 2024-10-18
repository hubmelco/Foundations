const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./Controller/user.js");
const loginRouter = require("./Controller/login.js");
const ticketRouter = require("./Controller/ticket.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Open up endpoints
app.get("/", "I updated again");
app.use("/tickets", ticketRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);


app.listen(port, () => {
  console.log(`Foundations app server located on http://localhost:3000`);
})