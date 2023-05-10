import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import User from '../types/User';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import axios, { AxiosError } from 'axios';
import { apiBaseUrl } from '../config';
import { UseLoginReturnType } from '../types';
import PokemonProgress from '../components/PokemonProgress';
import { error } from '@material-tailwind/react/types/components/input';

function ProfilePage() {
  const { user, token } = useAuthContext() as {
    user: User;
    token: string;
  };
  const { makeNotification } = useAppContext();
  const [localUser, setLocalUser] = useState<User | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(apiBaseUrl + `/player/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLocalUser(res.data);
        setIsLoaded(true);
      } catch (e) {
        console.error(e);
        makeNotification({
          message: 'Error loading information',
          type: 'error',
          duration: 4000
        });
      }
    }
    getUser();
  }, []);

  async function updateUser(editedFields: Map<keyof User | 'password', any>) {
    const formData = new FormData();
    for (const [key, value] of editedFields.entries()) {
      formData.append(key, value);
    }
    try {
      const res = await axios.post(apiBaseUrl + `/player`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLocalUser(res.data);
      setLocalUser(res.data);
      makeNotification({
        message: res.data.message,
        type: 'success',
        duration: 4000
      });
    } catch (e: unknown) {
      if (!(e instanceof AxiosError)) throw e;
      if (e.response) {
        // Error with response from the server
        console.error(e.response);
        let errorMessage = e.response.data?.error?.message || 'Unknown error';
        let errorDetailsMessages = e.response.data?.error?.details
          ?.map((detail: any) => detail.message)
          .join('\n');

        makeNotification({
          message: `Error updating information:\n${errorMessage}\n${
            errorDetailsMessages || ''
          }`,
          type: 'error',
          duration: 4000
        });
      } else if (e.request) {
        // Error making the request
        console.error(e.request);
        makeNotification({
          message: 'Error making the request',
          type: 'error',
          duration: 4000
        });
      } else {
        // Other errors
        console.error(e);
        makeNotification({
          message: 'An error occurred updating the profile',
          type: 'error',
          duration: 4000
        });
      }
    }
  }
  if (!isLoaded) return <PokemonProgress />;
  else {
    return <Profile user={localUser!} updateUser={updateUser} />;
  }
}

export default ProfilePage;
