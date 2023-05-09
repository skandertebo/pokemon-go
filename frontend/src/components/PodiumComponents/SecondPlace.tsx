import { FaCrown } from 'react-icons/fa';
import { apiBaseUrl } from '../../config';
import User from '../../types/User';
import avatarGirl2 from '../../assets/avatar-girl2.png';
import shoudDisplayDefaultImage from '../../utils/shouldDisplayDefaultImage';
const SecondPlace: React.FC<{ player: User | null }> = ({ player }) => {
  return (
    <div
      className={`relative overflow-visible flex h-40 w-24 flex-col items-center rounded-tl-2xl rounded-bl-2xl ${
        player ? 'bg-primary' : 'bg-fourth'
      } md:w-32`}
    >
      {player ? (
        <img
          src={
            shoudDisplayDefaultImage(player.image)
              ? avatarGirl2
              : apiBaseUrl + '/public/image/' + player.image
          }
          className=' relative bottom-7 h-16 w-16 rounded-full border-4 border-[#C0C0C0] bg-white '
        />
      ) : (
        <div className=' relative bottom-7 h-16 w-16 rounded-full border-4 border-[#C0C0C0] bg-fourth ' />
      )}

      <p className='overflow-hidden w-full text-ellipsis text-center pl-1 pr-1  relative bottom-3 text-[#C0C0C0] font-black'>
        {player ? player.playerTag : ''}
      </p>
      <p className='text-md relative bottom-1'>{player ? player.score : ''}</p>
    </div>
  );
};

export default SecondPlace;
