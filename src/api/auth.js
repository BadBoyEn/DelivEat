import api from './client';

// -- COMMENTO -- LOGIN MANAGER "puro"
export async function loginManager({ email, password }) {
  const { data } = await api.post('/manager/login', { email, password });
  // -- COMMENTO -- Backend imposta cookie HttpOnly; data = { token, role: 'manager' }
  return data;
}

// -- COMMENTO -- LOGIN RIDER "puro"
export async function loginRider({ email, password }) {
  const { data } = await api.post('/rider/login', { email, password });
  // -- COMMENTO -- data = { message, token, rider: {...} }
  // -- COMMENTO -- Salvo il token per l'interceptor (Bearer) da usare nelle API riservate ai rider
  if (data?.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

// -- COMMENTO -- REGISTRAZIONE RIDER
export async function signupRider(payload) {
  // -- COMMENTO -- payload: { firstName, lastName, numCell, dataNascita, citta, indirizzo, email, password }
  const { data } = await api.post('/rider/signup', payload);
  // -- COMMENTO -- data = { message, riderId }
  return data;
}

// -- COMMENTO -- LOGOUT RIDER: rimuove token dal client
export function logoutRider() {
  localStorage.removeItem('token');
}

// -- COMMENTO -- LOGIN "SMART": prova manager; se 404 (non manager) prova rider
export async function smartLogin({ email, password }) {
  try {
    // -- COMMENTO -- 1) Tentativo manager
    const m = await loginManager({ email, password });
    // -- COMMENTO -- Successo manager → ritorno ruolo esplicito
    return { role: 'manager', ...m };
  } catch (err) {
    // -- COMMENTO -- Se NON è email manager il backend risponde 404
    if (err?.status === 404) {
      // -- COMMENTO -- 2) Tentativo rider
      const r = await loginRider({ email, password });
      return { role: 'rider', ...r };
    }

    // -- COMMENTO -- Se è proprio email manager ma password sbagliata (401)
    // il backend manda "Password del manager errata"
    if (err?.status === 401 && /manager errata/i.test(err?.message || '')) {
      // -- COMMENTO -- Propaghiamo lo stesso messaggio senza far provare il rider
      throw err;
    }

    // -- COMMENTO -- Altri errori dal manager
    throw err;
  }
}
