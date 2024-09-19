const { getClient } = require("../Util/DBClient");
const { QueryCommand } = require("@aws-sdk/client-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const TableName = "foundation"

const createUser = async (Item) => {
    const command = new PutCommand({
        TableName,
        Item
    })
    const documentClient = getClient();
    await documentClient.send(command);
}

const getUserByUsername = async (username) => {
    const command = new QueryCommand({
        TableName,
        IndexName: "username-index",
        KeyConditionExpression: "#class = :class AND #username = :username",
        ExpressionAttributeNames: {
            "#class": "class",
            "#username": "username"
        },
        ExpressionAttributeValues: {
            ":class": {S: "user"},
            ":username": {S: username}
        }
    });
    const documentClient = getClient();
    const {Items} = await documentClient.send(command);
    const cleaned = Items.map((item) => {
        const user = {};
        user.username = Object.values(item.username)[0];
        user.role = Object.values(item.role)[0];
        user.id = Object.values(item.id)[0];
        user.password = Object.values(item.password)[0];
        return user;
    });
    return cleaned[0]; // The user or undefined (username should be unique)
}

const deleteUser = async (username) => {

}

const updateUser = async (username) => {

}

module.exports = {createUser, getUserByUsername, deleteUser, updateUser};