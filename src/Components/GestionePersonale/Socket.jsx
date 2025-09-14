import { io } from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL
  || (window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://deliveatbackend.onrender.com');

export const socket = io(SOCKET_URL, {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: false,
});
