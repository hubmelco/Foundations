const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "Unauthorized Access"})
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
    } catch (err) {
        return res.status(403).json({message: "Authorization error, try relogging"})
    }
    next();
}

const adminAuthenticate = (req, res, next) => {
    if (!res.locals.user) { //If user has not been aunthenticated yet
        authenticate(req, res, next);
    }
    const {role} = res.locals.user;
    if (role.toLowerCase() === "employee") {
        return res.status(401).json({message: "Priviledge too low"});
    }
    next();
}

module.exports = {authenticate, adminAuthenticate};