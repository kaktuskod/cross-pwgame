import React, { createContext } from 'react'
import SocketIO from 'socket.io-client'

const io = SocketIO('http://localhost:4000')
export const SocketContext = createContext(io)

export const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={io}>
        {children}
    </SocketContext.Provider>
)