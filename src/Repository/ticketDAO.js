const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const {getClient} = require("../Util/DBClient");

const TableName = "foundation"

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

const updateTicket = async () => {
    
}

module.exports = {createTicket, getTicket, updateTicket, deleteTicket}