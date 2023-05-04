import { useState } from 'react';
import Profile from '../components/Profile';
import User from '../types/User';
import avatar from '../assets/avatar-girledited.png';
function ProfilePage() {
  const useryas: User = {
    id: 1,
    playerTag: 'GrumpyChef',
    email: 'yasmine@gmail.com',
    password: 'blalbal',
    image: avatar,
    score: 0
  };

  const [user, setUser] = useState<User>(useryas);
  function updateUser(user: User) {
    setUser(user);
    console.log(JSON.stringify(user));
  }

  return (
    <div>
      <Profile {...{ user }} updateUser={updateUser} />
    </div>
  );
}

export default ProfilePage;
