import { ApiGatewayManagementApi, DynamoDB } from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const api = new ApiGatewayManagementApi({ endpoint: process.env.API_GATEWAY_WS_ENDPOINT, region: process.env.REGION });
const dynamo = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.REGION });

const sendMessage = async (ConnectionId: string, Data: string) => await api.postToConnection({ ConnectionId, Data }).promise();

exports.handler = async (event: APIGatewayEvent) => {
    const user_id = event.requestContext.connectionId;

    try {
        const body = JSON.parse(event.body);

        // If all the requirements are full filled create a item in a table and put the user in it. 
        if (body.uid && body.name && body.custom) {
            await dynamo.put({
                TableName: process.env.TABLE_NAME,
                Item: {
                    uid: body.uid,
                    users: [user_id],
                    names: [body.name],
                    custom: body.custom
                }
            }).promise();
            await sendMessage(user_id, JSON.stringify({ status: 200, message: 'group created' }));
        }
    } catch (error) {
        return { statusCode: 300 };
    }

    return { statusCode: 200 };
};