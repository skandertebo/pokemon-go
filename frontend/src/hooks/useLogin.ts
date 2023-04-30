import { useCallback, useEffect, useState } from 'react';
import { AuthenticationStates, UseLoginReturnType } from '../types';
import User from '../types/User';
import axios from 'axios';
import { apiBaseUrl } from '../config';

export default function useLogin(): UseLoginReturnType {
  const [token, setTokenLocally] = useState(localStorage.getItem('token'));

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
            if (!!user.playerTag) {
              setAuthentication(AuthenticationStates.AUTHORIZED);
            } else {
              setAuthentication(AuthenticationStates.ADMIN);
            }
            setUser(user);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setAuthentication(AuthenticationStates.NOT_LOGGED_IN);
          }
        });
    }
  }, [token]);
  const [user, locallySetUser] = useState<User | null>(null);
  const setUser = useCallback(
    (user: User | null) => {
      locallySetUser(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    [locallySetUser]
  );
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        if (event.newValue === null) {
          locallySetUser(null);
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setToken(null);
          }
        } else {
          if (user !== JSON.parse(event.newValue)) {
            setUser(null);
            if (localStorage.getItem('token')) {
              localStorage.removeItem('token');
              setToken(null);
            }
          }
        }
      }
    });
  }, []);
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        if (event.newValue === null) {
          if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            setUser(null);
            setTokenLocally(null);
          }
        } else {
          if (token !== event.newValue) {
            if (localStorage.getItem('user')) {
              localStorage.removeItem('user');
              setUser(null);
            }
          }
        }
      }
    });
  });

  return { authentication, setToken, token, user };
}
