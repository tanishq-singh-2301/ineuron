import { ApiGatewayManagementApi, DynamoDB } from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const api = new ApiGatewayManagementApi({ endpoint: process.env.API_GATEWAY_WS_ENDPOINT, region: process.env.REGION });
const dynamo = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.REGION });

const sendMessage = async (ConnectionId: string, Data: string) => await api.postToConnection({ ConnectionId, Data }).promise();

exports.handler = async (event: APIGatewayEvent) => {
    const user_id = event.requestContext.connectionId;

    try {
        const body = JSON.parse(event.body);

        if (body.uid && body.name) {
            const a = await dynamo.get({
                TableName: process.env.TABLE_NAME,
                Key: { uid: body.uid }
            }).promise();

            try {
                const names = [...a.Item.names, body.name];
                const users = [...a.Item.users, user_id];

                await dynamo.update({
                    TableName: process.env.TABLE_NAME,
                    Key: {
                        uid: body.uid
                    },
                    UpdateExpression: "set #users=:x, #names=:n",
                    ExpressionAttributeNames: {
                        "#users": "users",
                        "#names": "names"
                    },
                    ExpressionAttributeValues: {
                        ":x": users,
                        ":n": names
                    },
                    ReturnValues: "UPDATED_NEW"
                }).promise();

                await sendMessage(user_id, JSON.stringify({ status: 200, message: 'added to group', names }));
                await Promise.all(users.map(async (id: string) => await sendMessage(id, JSON.stringify({ action: "usersConnected", names }))))
            } catch {
                await sendMessage(user_id, JSON.stringify({ status: 400, message: 'group dosent exist.' }));
            }
        } else {
            await sendMessage(user_id, JSON.stringify({ status: 400, message: 'room-id or name is noot given' }));
        }
    } catch (error) {
        return { statusCode: 300 };
    }

    return { statusCode: 200 };
};