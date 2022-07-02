import React, { createContext, useState } from 'react';

// @ts-ignore
const ws_ = typeof window !== "undefined" ? new WebSocket(process.env.PUBLIC_WS_ENDPOINT) : null

const WsContext = createContext<{
    ws: WebSocket;
}>({ ws: ws_! });

const WsState = ({ children }: { children: React.ReactNode }) => {
    const [ws, setWs] = useState<WebSocket>(ws_!);

    return (
        <WsContext.Provider value={{ ws }}>
            {children}
        </WsContext.Provider>
    );
};

export {
    WsState,
    WsContext
};