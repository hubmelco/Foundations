/**
 * Creates the users endpoint for users to create, read, update, and delete users
 * 
 * @param {*} app The express server application
 */
const userService = (app) => {
    const initialUserObjectIdea = {
        username: "string",
        role: "ints or strings",
        password: "string, maybe encrypted",
        firstName: "string",
        lastName: "string",
        address: "string",
        profilePicture: "image blob (Yuck, maybe not)"  
    }

    //Add register (create) endpoint
    //Add login (get) endpoint

    app.get("/users", (req, res) => {
        return res.json("Hello, Users!");
    })
}

module.exports = userService;