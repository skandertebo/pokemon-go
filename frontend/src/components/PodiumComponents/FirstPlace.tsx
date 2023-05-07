import { FaCrown } from 'react-icons/fa';
import { apiBaseUrl } from '../../config';
import User from '../../types/User';
const FirstPlace: React.FC<{ player: User | null }> = ({ player }) => {
  return (
    <div
      className={`relative overflow-visible flex h-48 w-28 flex-col items-center rounded-t-2xl ${
        player ? 'bg-[#003478]' : 'bg-fourth'
      }  md:w-36 `}
    >
      <FaCrown
        className='relative bottom-14 right-10 -rotate-45 h-12 w-12'
        fill='#FFD700'
      />
      {player ? (
        <img
          src={apiBaseUrl + '/public/image/' + player.image}
          className='relative bottom-20 h-20 w-20 rounded-full bg-black border-4 border-[#FFD700] '
        ></img>
      ) : (
        <div className='relative bottom-20 h-20 w-20 rounded-full bg-fourth border-4 border-[#FFD700] ' />
      )}
      <p className=' break-all  pl-1 pr-1 relative bottom-16 font-black text-lg text-[#FFD700] '>
        {player ? player.playerTag : ''}
      </p>
      <p className='relative bottom-14'>{player ? player.score : ''}</p>
    </div>
  );
};

export default FirstPlace;
