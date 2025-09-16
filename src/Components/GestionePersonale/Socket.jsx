// -- COMMENTO -- Disabilito Socket.io fuori da localhost (niente Render)
import { io } from 'socket.io-client';

const isLocal =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const SOCKET_URL = isLocal ? 'http://localhost:5000' : null;

// -- COMMENTO -- Se non siamo in locale, non creo nemmeno la connessione
export const socket = SOCKET_URL
  ? io(SOCKET_URL, {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    })
  : null;
