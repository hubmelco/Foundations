const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb");

const getClient = (() => {
    let instance = null;
    function init() {
        if (!instance) {
            console.log("creating DBClient instance!")
            const client = new DynamoDBClient({region: "us-east-2"});
            const documentClient = DynamoDBDocumentClient.from(client);
            instance = documentClient;
        }
        return instance;
    }
    return init;
})()

module.exports = {getClient};