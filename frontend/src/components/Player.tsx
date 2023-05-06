import { apiBaseUrl } from '../config';
import User from '../types/User';

const Player: React.FC<{ index: number; player: Partial<User> }> = ({
  index,
  player
}) => {
  return (
    <div className='w-5/6 max-w-3xl'>
      <div className='mb-3  flex w-full  flex-row  gap-5 '>
        <p className='font-black self-center'> {index} </p>
        <img
          src={apiBaseUrl + '/public/image/' + player.image}
          className='h-14 w-14 rounded-full border-2 border-black bg-white'
        ></img>
        <span className='self-center font-black'>{player.playerTag}</span>
        <span className='self-center flex-grow text-right'>{player.score}</span>
      </div>
      <hr className='border-t w-full border-black mb-4' />
    </div>
  );
};

export default Player;
