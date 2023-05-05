import { apiBaseUrl } from '../config';
import { RegisterBody } from '../types/RegisterBody';

export async function registerUser(data: RegisterBody) {
  const response = await fetch(apiBaseUrl + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
    })
  });
  return await response.json();
}
