import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@material-tailwind/react';
import Leaderboard from './Leaderboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default App;
