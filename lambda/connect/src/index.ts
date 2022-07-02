import { ApiGatewayManagementApi } from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const api = new ApiGatewayManagementApi({ endpoint: process.env.API_GATEWAY_WS_ENDPOINT, region: process.env.REGION });
const sendMessage = async (ConnectionId: string, Data: string) => await api.postToConnection({ ConnectionId, Data }).promise();

exports.handler = async (event: APIGatewayEvent) => {
    const user_id = event.requestContext.connectionId;

    try {
        await sendMessage(user_id, JSON.stringify({
            connected: true
        }));
    } catch (error) {
        return { statusCode: 300 };
    }

    return { statusCode: 200 };
};