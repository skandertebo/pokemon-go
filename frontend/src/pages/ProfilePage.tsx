import { useState } from 'react';
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

  async function getPlayer(userID: number) {
    try {
      const res = await axios.get(apiBaseUrl + `/player/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (e) {
      console.error(e);
      makeNotification({
        message: 'Error loading information',
        type: 'error',
        duration: 4000
      });
    }
  }

  const playerData = getPlayer(user!.id);

  const [localUser, setLocalUser] = useState<User>(playerData);

  function updateUser(localUser: User) {}

  return (
    <div>
      <Profile {...{ localUser }} updateUser={updateUser} />
    </div>
  );
}

export default ProfilePage;
