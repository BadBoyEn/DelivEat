import api from './client';

// -- ACCESSO MANAGER --
export async function loginManager({ email, password }) {
  const { data } = await api.post('/manager/login', { email, password });
  // data = { message, token }
  return data;
}

// -- ACCESSO RIDER --
export async function loginRider({ email, password }) {
  const { data } = await api.post('/rider/login', { email, password });
  // data = { message, token, rider: {...} }
  return data;
}

// -- REGISTRAZIONE RIDER --
export async function signupRider(payload) {
  const { data } = await api.post('/rider/signup', payload);
  // payload = { firstName, lastName, numCell, dataNascita, citta, indirizzo, email, password }
  return data; // data = { message, riderId }
}
