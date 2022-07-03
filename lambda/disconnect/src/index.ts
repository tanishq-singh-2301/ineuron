import { ApiGatewayManagementApi, DynamoDB } from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const api = new ApiGatewayManagementApi({ endpoint: process.env.API_GATEWAY_WS_ENDPOINT, region: process.env.REGION });
const dynamo = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.REGION });

const sendMessage = async (ConnectionId: string, Data: string) => await api.postToConnection({ ConnectionId, Data }).promise();

exports.handler = async (event: APIGatewayEvent) => {
    const user_id = event.requestContext.connectionId;
    // const route = event.requestContext.routeKey;

    try {

        const data = await dynamo.scan({
            TableName: process.env.TABLE_NAME,
            FilterExpression: `contains(#users, :id)`,
            ExpressionAttributeNames: {
                "#users": "users"
            },
            ExpressionAttributeValues: {
                ":id": user_id
            }
        }).promise();

        const users = data.Items[0].users;
        const names = data.Items[0].names;

        const index = users.indexOf(user_id);

        if (index > -1) {
            users.splice(index, 1);
            names.splice(index, 1);
            if ((data.Items[0].custom) && (users.length === 0)) {
                await dynamo.delete({
                    TableName: process.env.TABLE_NAME,
                    Key: {
                        uid: data.Items[0].uid
                    },
                }).promise();
            } else {
                await dynamo.update({
                    TableName: process.env.TABLE_NAME,
                    Key: {
                        uid: data.Items[0].uid
                    },
                    UpdateExpression: "set #users=:x, #names=:n",
                    ExpressionAttributeNames: {
                        "#users": "users",
                        "#names": "names"
                    },
                    ExpressionAttributeValues: {
                        ":x": [...users],
                        ":n": [...names]
                    },
                    ReturnValues: "UPDATED_NEW"
                }).promise();
                await Promise.all(users.map(async (id: string) => await sendMessage(id, JSON.stringify({ action: "usersConnected", names }))));
            }
        }

    } catch (error) {
        return { statusCode: 300 };
    }

    return { statusCode: 200 };
};