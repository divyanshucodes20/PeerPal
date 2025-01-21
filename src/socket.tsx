import React, { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }:{children:any}) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
