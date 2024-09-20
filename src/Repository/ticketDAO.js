const { PutCommand, UpdateCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

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

const getTicket = async () => {

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

module.exports = {createTicket, getTicket, updateTicket, deleteTicket, getTicketById}