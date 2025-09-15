import api from './client';

// -- COMMENTO -- LOGIN MANAGER "puro"
export async function loginManager({ email, password }) {
  const { data } = await api.post('/manager/login', { email, password });
  // -- COMMENTO -- Il BE può impostare cookie HttpOnly; data può contenere { token, role: 'manager' }
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

// -- COMMENTO -- SIGNUP RIDER (registrazione)
export async function signupRider({ nome, cognome, telefono, dataNascita, citta, indirizzo, email, password }) {
  // -- COMMENTO -- Mappa FE -> BE: adegua i campi ai nomi che usa il tuo backend
  const payload = {
    nome,               // string
    cognome,            // string
    telefono,           // string (solo cifre)
    dataNascita,        // ISO (YYYY-MM-DD) o stringa gestita dal BE
    citta,              // string
    indirizzo,          // string
    email,              // string
    password,           // string
  };
  const { data } = await api.post('/rider/signup', payload);
  // -- COMMENTO -- Se il BE rilascia token al signup
  if (data?.token) {
    localStorage.setItem('token', data.token);
  }
  return data; // es: { message, rider, token }
}

// -- COMMENTO -- LOGIN SMART: prova manager, se fallisce in modo "normale", prova rider
export async function smartLogin({ email, password }) {
  try {
    const res = await loginManager({ email, password });
    return { role: 'manager', ...res };
  } catch (err) {
    // -- COMMENTO -- Se non è un 401 "atteso", rilancia
    if (err?.status && err.status !== 401) throw err;

    // -- COMMENTO -- Alcuni BE inviano messaggi specifici per distinguere account
    const msg = (err?.message || '').toLowerCase();
    const isManagerButWrongPass = /manager.*errata/.test(msg);

    if (isManagerButWrongPass) {
      // -- COMMENTO -- Era davvero un manager ma password errata → non provare rider
      throw err;
    }

    // -- COMMENTO -- Prova login rider
    const r = await loginRider({ email, password });
    return { role: 'rider', ...r };
  }
}

// -- COMMENTO -- LOGOUT RIDER (client-side)
export function logoutRider() {
  localStorage.removeItem('token');
}
