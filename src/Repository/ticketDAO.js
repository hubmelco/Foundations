const { PutCommand, UpdateCommand, GetCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const {getClient} = require("../Util/DBClient");

const TableName = "foundation";

const createTicket = async (Item) => {
    const command = new PutCommand({
        TableName,
        Item
    });
    const documentClient = getClient();
    await documentClient.send(command);
}

const getTickets = async (username) => {
    const command = new QueryCommand({
        TableName,
        IndexName: "username-index",
        KeyConditionExpression: "#class = :class AND #username = :username",
        ExpressionAttributeNames: {
            "#class": "class",
            "#username": "username"
        },
        ExpressionAttributeValues: {
            ":class": "ticket",
            ":username": username
        }
    })
    const documentClient = getClient();
    const {Items} = await documentClient.send(command);
    return Items;
}

const getPendingTickets = async (username) => {
    const command = new QueryCommand({
        TableName,
        IndexName: "class-status-index",
        KeyConditionExpression: "#class = :class AND #status = :status",
        ExpressionAttributeNames: {
            "#class": "class",
            "#status": "status",
            "#username": "username"
        },
        ExpressionAttributeValues: {
            ":class": "ticket",
            ":status": "pending",
            ":username": username
        },
        FilterExpression: "#username <> :username"
    })
    const documentClient = getClient();
    const {Items} = await documentClient.send(command);
    return Items;
}

const deleteTicket = async () => {

}

const updateTicket = async (id, status) => {
    const command = new UpdateCommand({
        TableName,
        Key: {class: "ticket", id},
        AttributeUpdates: {
            status: {Value: status}
        }
    })
    const documentClient = getClient();
    await documentClient.send(command);
}

const getTicketById = async (id) => {
    const command = new GetCommand({
        TableName,
        Key: {class: "ticket", id}
    })
    const documentClient = getClient();
    const {Item} = await documentClient.send(command);
    return Item;
}

module.exports = {createTicket, getTickets, updateTicket, deleteTicket, getTicketById, getPendingTickets}