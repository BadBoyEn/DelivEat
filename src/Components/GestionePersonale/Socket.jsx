import { io } from 'socket.io-client';

const WS_URL =
  (import.meta.env.VITE_WS_URL && import.meta.env.VITE_WS_URL.trim()) ||
  'http://localhost:5000'; // -- COMMENTO -- backend

export const socket = io(WS_URL, {
  autoConnect: false, // -- COMMENTO -- connetto solo dopo aver impostato auth
  withCredentials: true,
});
