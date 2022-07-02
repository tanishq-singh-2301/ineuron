import { ApiGatewayManagementApi, DynamoDB } from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const api = new ApiGatewayManagementApi({ endpoint: process.env.API_GATEWAY_WS_ENDPOINT, region: process.env.REGION });
const dynamo = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.REGION });

const sendMessage = async (ConnectionId: string, Data: string) => await api.postToConnection({ ConnectionId, Data }).promise();

exports.handler = async (event: APIGatewayEvent) => {
    const user_id = event.requestContext.connectionId;

    try {
        const body = JSON.parse(event.body);

        if (body.uid && body['message'] && body.name) {
            const roomsForJump = await dynamo.get({
                TableName: process.env.TABLE_NAME,
                Key: {
                    uid: body.uid
                }
            }).promise();

            await Promise.all(roomsForJump.Item.users.map(async (user: string) => await sendMessage(user, JSON.stringify({ action: 'messasge', message: body['message'], name: body.name }))));
        } else {
            await sendMessage(user_id, JSON.stringify({ status: 400, message: 'room-id, name or message is missing' }));
        }
    } catch (error) {
        return { statusCode: 300 };
    }

    return { statusCode: 200 };
};