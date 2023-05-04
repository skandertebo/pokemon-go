import { useState } from 'react';
import Profile from '../components/Profile';
import User from '../types/User';
import avatar from '../assets/avatar-girledited.png';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

function ProfilePage() {
  const { user } = useAuthContext() as { user: User };
  const [localUser, setLocalUser] = useState<User>(user);
  const { makeNotification } = useAppContext();

  function updateUser(user: User) {}

  return (
    <div>
      <Profile {...{ user }} updateUser={updateUser} />
    </div>
  );
}

export default ProfilePage;
