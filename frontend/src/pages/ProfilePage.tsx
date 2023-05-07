import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import User from '../types/User';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { UseLoginReturnType } from '../types';
import PokemonProgress from '../components/PokemonProgress';

function ProfilePage() {
  const { user, token } = useAuthContext() as UseLoginReturnType;
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

  async function updateUser(formData: FormData) {
    try {
      const res = await axios.post(apiBaseUrl + `/player`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLocalUser(res.data);
    } catch (e) {
      console.error(e);
      makeNotification({
        message: 'Error updating information',
        type: 'error',
        duration: 4000
      });
    }
  }

  if (!isLoaded) return <PokemonProgress />;
  else {
    return <Profile user={localUser!} updateUser={updateUser} />;
  }
}

export default ProfilePage;
