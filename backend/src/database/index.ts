import { initializeApp, cert, App } from 'firebase-admin/app';

const connection: { isConnected: number; app: App | undefined } = {
    isConnected: 0,
    app: undefined
};

const connectToDB = async (): Promise<App> => {
    if (connection.isConnected) return connection.app;

    else {
        const app: App = initializeApp({
            credential: cert({
                projectId: process.env.PROJECT_ID,
                privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.CLIENT_EMAIL,
            }),
            databaseURL: process.env.DATABASE_URL
        });

        connection.isConnected = 1;
        connection.app = app;

        return app;
    }
}

export default connectToDB;