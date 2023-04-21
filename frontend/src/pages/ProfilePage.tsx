import { useState } from 'react';
import Profile from '../components/Profile';
import User from '../types/User';
import avatar from '../assets/avatar-girledited.png';
function ProfilePage() {
  const useryas: User = {
    id: 1,
    name: 'yasmine',
    username: 'GrumpyChef',
    email: 'yasmine@gmail.com',
    password: 'blalbal',
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: avatar,
    gender: 'Female',
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
