import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import Profile from "./componenets/Profile";
import User from "./types/User";
import avatar from "./assets/avatar-girledited.png";
function App() {
  const [count, setCount] = useState(0);

  const useryas: User = {
    id: 1,
    name: "yasmine",
    username: "GrumpyChef",
    email: "yasmine@gmail.com",
    password: "blalbal",
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: avatar,
    gender: "Female",
  };
  const [user, setUser] = useState<User>(useryas);
  function updateUser(user: User) {
    setUser(user);
    console.log(JSON.stringify(user));
  }

  return (
    <div className=" ">
      <Profile {...{ user }} updateUser={updateUser} />
    </div>
  );
}

export default App;
