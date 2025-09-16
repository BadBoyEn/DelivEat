// -- COMMENTO -- Socket.io abilitato solo in locale
import { io } from 'socket.io-client';

const isLocal =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const SOCKET_URL = isLocal ? 'http://localhost:5000' : null;

export const socket = SOCKET_URL
  ? io(SOCKET_URL, {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    })
  : null;
