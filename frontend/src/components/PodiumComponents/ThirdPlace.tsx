import { apiBaseUrl } from '../../config';
import User from '../../types/User';
import shoudDisplayDefaultImage from '../../utils/shouldDisplayDefaultImage';
import avatarGirl2 from '../../assets/avatar-girl2.png';

const ThirdPlace: React.FC<{ player: User | null }> = ({ player }) => {
  return (
    <div
      className={`overflow-visible flex h-32 w-24 flex-col items-center rounded-tr-2xl rounded-br-2xl ${
        player ? 'bg-primary' : 'bg-fourth'
      }  md:w-32 `}
    >
      {player ? (
        <img
          src={
            shoudDisplayDefaultImage(player.image)
              ? avatarGirl2
              : apiBaseUrl + '/public/image/' + player.image
          }
          className='relative bottom-7 h-16 w-16 rounded-full bg-white border-4 border-[#CD7F32]'
        ></img>
      ) : (
        <div className='relative bottom-7 h-16 w-16 rounded-full bg-fourth border-4 border-[#CD7F32]' />
      )}
      <p className=' break-all  pl-1 pr-1  relative bottom-5 font-black text-sm text-[#CD7F32]'>
        {player ? player.playerTag : ''}
      </p>
      <p className=' relative bottom-3'>{player ? player.score : ''}</p>
    </div>
  );
};

export default ThirdPlace;
