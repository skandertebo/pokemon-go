import { useCallback, useEffect, useState } from 'react';
import { AuthenticationStates, UseLoginReturnType } from '../types';
import User from '../types/User';
import axios from 'axios';
import { apiBaseUrl } from '../config';

export default function useLogin(): UseLoginReturnType {
  const [token, setTokenLocally] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  const setToken = useCallback(
    (token: string | null) => {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      setTokenLocally(token);
    },
    [setTokenLocally]
  );

  const [authentication, setAuthentication] = useState(
    token
      ? AuthenticationStates.VERIFYING_AUTH
      : AuthenticationStates.NOT_LOGGED_IN
  );

  useEffect(() => {
    setAuthentication(AuthenticationStates.VERIFYING_AUTH);
    if (!token) {
      setAuthentication(AuthenticationStates.NOT_LOGGED_IN);
      setUser(null);
      return;
    } else {
      axios
        .get(apiBaseUrl + '/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const user = response.data as User;
            if (user.playerTag !== null && user.playerTag !== undefined) {
              setAuthentication(AuthenticationStates.AUTHORIZED);
            } else {
              setAuthentication(AuthenticationStates.ADMIN);
            }
            setUser(user);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.error(error.response.data);
            setAuthentication(AuthenticationStates.NOT_LOGGED_IN);
            setToken(null);
          }
        });
    }
  }, [token]);
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        if (event.newValue === null) {
          setTokenLocally(null);
        }
      }
    });
  });

  return { authentication, setToken, token, user, setUser };
}
