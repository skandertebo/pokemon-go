import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import User from '../types/User';
import avatar from '../assets/avatar-girledited.png';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { UseLoginReturnType } from '../types';
import Player from '../components/Player';

function ProfilePage() {
  const { user, token } = useAuthContext() as UseLoginReturnType;
  const { makeNotification } = useAppContext();
  const [localUser, setLocalUser] = useState<User | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { enableWaiting, disableWaiting } = useAppContext();
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

  async function updateUser(localUser: User) {
    try {
      const res = await axios.patch(apiBaseUrl + `/player/${user?.id}`, {
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

  if (!isLoaded) return <div>Loading...</div>;
  else {
    return (
      <div>
        <Profile user={localUser} updateUser={updateUser} />
      </div>
    );
  }
}

export default ProfilePage;
