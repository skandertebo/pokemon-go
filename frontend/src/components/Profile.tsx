import { useRef, useState } from 'react';
import { Card, Button, Typography } from '@material-tailwind/react';
import { AiFillEdit } from 'react-icons/ai';
import User from '../types/User';
import { apiBaseUrl } from '../config';
import avatarGirl2 from '../assets/avatar-girl2.png';
import shoudDisplayDefaultImage from '../utils/shouldDisplayDefaultImage';

type EditedFieldsType = Map<keyof User | 'password', any>;

interface ProfileProps {
  user: User;
  updateUser: (editedFields: EditedFieldsType) => Promise<unknown>;
}

const Profile: React.FC<ProfileProps> = ({ user, updateUser }) => {
  const [playerTag, setPlayerTag] = useState<string>(user.playerTag);
  const [email, setEmail] = useState<string>(user.email);
  const imageInput = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    `${apiBaseUrl}/public/image/${user.image}`
  );
  const [password, setPassword] = useState<string>('');
  const [modify, setModify] = useState<boolean>(false);

  const [editedFields, setEditedFields] = useState<EditedFieldsType>(new Map());

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const selectedFile = event.target.files?.[0];
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : '_');
    setEditedFields((prev) => {
      const newFields = new Map(prev);
      newFields.set('image', selectedFile);
      return newFields;
    });
  };

  const handleImageReset = () => {
    setImagePreview(`${apiBaseUrl}/public/image/${user.image}`);
    setEditedFields((prev) => {
      const newFields = new Map(prev);
      newFields.delete('image');
      return newFields;
    });
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  };

  const handleImageRemoval = () => {
    setImagePreview('_');
    setEditedFields((prev) => {
      const newFields = new Map(prev);
      newFields.set('image', null);
      return newFields;
    });
  };

  function lockForm() {
    if(modify){
      if(editedFields.size === 0) setModify(false);
    }else{
    setModify((prev) => !prev);
    }}
  

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(editedFields).then(() => {
      setEditedFields(new Map());
    });
  };

  return (
    <div
      className='w-full sm:absolute sm:top-1/3 sm:mt-20 sm:left-1/2  sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 
              lg:w-2/3 p-3 bg-secondary'
    >
      <Card className=' bg-secondary shadow-2xl mx-auto mb-16 rounded-2xl xl:mt-32'>
        <Button
          className=' mod_button ml-auto mt-2 mr-2 hover:transform hover:scale-105 hover:transition hover:duration-200 bg-third   rounded-full h-16 border-none w-16 flex justify-center items-center  text-9xl'
          onClick={lockForm}
          disabled={editedFields.size !== 0}
        >
          <AiFillEdit className='text-white ' />
        </Button>
        <div className=' p-2 mt-5 ml-2 absolute left-0 top-0 font-sans'>
          <Typography variant='h4' className='text-primary'>
            Profile
          </Typography>
        </div>
        <div>
          <form
            className=' mb-2 mx-auto w-80 maw-h-screen '
            onSubmit={(e) => {
              handleSave(e);
            }}
          >
            <div>
              <img
                src={
                  shoudDisplayDefaultImage(imagePreview)
                    ? avatarGirl2
                    : imagePreview
                }
                alt='image avatar'
                className='mx-auto mb-4 w-[200px] h-[200px] rounded-full border-8 border-third p-3 justify-self-center flex '
              />
              <div className='h-0'>
                <label className='  hover:text-third   rounded-full text-lg ' htmlFor='image' >
                  {modify ? (
                    <div className='bg-secondary border-4 border-third w-12 h-12 rounded-full flex justify-center items-center relative -top-20 left-52 cursor-pointer'>
                        <AiFillEdit className='text-third text-2xl'/>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </label>
                <input
                    type='file'
                    accept='image/*'
                    name='image'
                    id='image'
                    ref={imageInput}
                    onChange={handleImageChange}
                    className='hidden'
                    disabled={!modify}
                ></input>
              </div>
              <div className={modify ? 'w-full flex flex-row justify-center gap-9 mb-4' : 'hidden'}>
                <div
                className='w-20 bg-red-300 h-12 rounded-full flex justify-center items-center cursor-pointer clickable shadow-md shadow-gray-500 '
                onClick={handleImageRemoval}
                >
                  <h1 className='text-white font-sans font-medium'>
                    remove
                  </h1>
                </div>
                <div
                className='w-20 bg-red-300 h-12 rounded-full flex justify-center items-center cursor-pointer clickable shadow-md shadow-gray-500 '
                onClick={handleImageReset}
                >
                  <h1 className='text-white font-sans'>
                    reset
                  </h1>
                </div>
              </div>
            </div>
            <div className='mb-2 flex flex-col gap-6'>
              <div>
                <label className='text-primary mr-60 p-0  text-lg font-medium'>
                  UserName
                </label>
                <input
                  className='inline-block w-full shrink-1 focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50 bg-white disabled:bg-inherit'
                  type='text'
                  value={playerTag}
                  onChange={(e) => {
                    setPlayerTag(e.target.value);
                    if (e.target.value !== user.playerTag) {
                      setEditedFields((prev) => {
                        const newFields = new Map(prev);
                        newFields.set('playerTag', e.target.value);
                        return newFields;
                      });
                    } else {
                      setEditedFields((prev) => {
                        const newFields = new Map(prev);
                        newFields.delete('playerTag');
                        return newFields;
                      });
                    }
                  }}
                  disabled={!modify}
                />
              </div>
              <div>
                <label className='text-primary mr-60 p-0  text-lg font-medium'>
                  Email
                </label>
                <input
                  className='inline-block w-full shrink-1 focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50 bg-white disabled:bg-inherit'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value !== user.email) {
                      setEditedFields((prev) => {
                        const newFields = new Map(prev);
                        newFields.set('email', e.target.value);
                        return newFields;
                      });
                    } else {
                      setEditedFields((prev) => {
                        const newFields = new Map(prev);
                        newFields.delete('email');
                        return newFields;
                      });
                    }
                  }}
                  disabled={!modify}
                />
              </div>
              <div>
                <label className='text-primary mr-60 p-0  text-lg font-medium'>
                  Password
                </label>
                <input
                  type='password'
                  className='inline-block w-full shrink-1 focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50 bg-white disabled:bg-inherit'
                  placeholder='Edit Password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value !== '') {
                      setEditedFields((prev) => {
                        const newFields = new Map(prev);
                        newFields.set('password', e.target.value);
                        return newFields;
                      });
                    } else {
                      setEditedFields((prev) => {
                        const newFields = new Map(prev);
                        newFields.delete('password');
                        return newFields;
                      });
                    }
                  }}
                  disabled={!modify}
                />
              </div>
            </div>
            <div className='mb-4'>
              <Button
                className={modify?' save mt-2 w-1/2 mx-auto bg-primary focus:opacity-50 ': 'hidden'}
                fullWidth
                type='submit'
                onClick={lockForm}
                disabled={!modify || editedFields.size === 0}
              >
                Save Profile
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
