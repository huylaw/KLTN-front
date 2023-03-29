import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';
const socket = io(URL, { autoConnect: false });

function createWebSocketPlugins(socket){
    return (store) => {
        store.$socket = socket;
        // add more socket event listening
    };
}

export const websocketPlugin = createWebSocketPlugins(socket);
export default socket;


