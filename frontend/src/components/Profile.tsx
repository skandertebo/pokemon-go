import { useRef, useState } from 'react';
import avatar from '../assets/avatar-girledited.png';
import { Card, Button, Typography } from '@material-tailwind/react';
import { AiFillEdit } from 'react-icons/ai';
import User from '../types/User';

interface ProfileProps {
  user: User;
  updateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, updateUser }) => {
  const [name, setName] = useState<string>(user.name);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const imageInput = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user.avatar);
  const [modify, setModify] = useState<boolean>(false);
  const [gender, setGender] = useState<string>(user.gender);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  function lockForm(event: React.MouseEvent<HTMLButtonElement>) {
    const elements = document.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >('input,select');

    elements.forEach((element) => {
      element.disabled = modify;
      element.classList.toggle('bg-white');
    });

    const saveButton = document.querySelector('.save') as HTMLButtonElement;
    saveButton.disabled = !modify;

    const modButton = document.querySelector(
      '.mod_button'
    ) as HTMLButtonElement;
    modButton.disabled = modify;

    setModify(!modify);
  }

  const handleSave = () => {
    const newUser = {
      ...user,
      name,
      username,
      email,
      avatar: imagePreview || user.avatar,
      gender,
      updatedAt: new Date()
    };

    console.log(JSON.stringify(newUser));
    updateUser(newUser);
  };

  return (
    <div
      className='w-screen sm:absolute sm:top-1/3 sm:mt-20 sm:left-1/2  sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 
             md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 2xl:h-max p-3'
    >
      <Card className=' bg-secondary shadow-2xl mx-auto mb-16 rounded-2xl xl:mt-32'>
        <Button
          className=' mod_button ml-auto mt-2 mr-2 hover:transform hover:scale-105 hover:transition hover:duration-200 bg-third   rounded-full h-16 border-none w-16 flex justify-center items-center  text-9xl'
          onClick={lockForm}
          disabled={modify}
        >
          <AiFillEdit className='text-white ' />
        </Button>
        <div className=' p-2 mt-5 ml-2 absolute left-0 top-0 font-sans'>
          <Typography variant='h4' color='blue-gray'>
            Profile!
          </Typography>
        </div>
        <div>
          <form
            className=' mb-2 mx-auto w-80 maw-h-screen '
            onSubmit={handleSave}
          >
            <div>
              <img
                src={imagePreview || avatar}
                alt='image avatar'
                className='mx-auto mb-4 w-[200px] h-[200px] rounded-full border-8 border-third p-3 justify-self-center flex '
              />
              <div>
                <label className='  hover:text-third   rounded-full text-lg '>
                  {modify ? (
                    <div className='text-center'>Edit profile picture</div>
                  ) : (
                    <div></div>
                  )}
                  <input
                    type='file'
                    ref={imageInput}
                    onChange={handleImageChange}
                    className='hidden '
                    disabled={!modify}
                    //   value={imagePreview}
                  ></input>
                </label>
              </div>
            </div>
            <div className='mb-2 flex flex-col gap-6'>
              <div>
                <label className='text-black mr-60 p-0  text-lg font-medium'>
                  UserName
                </label>
                <input
                  className='inline-block w-full shrink-1 focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
                  placeholder='Ex: GrumpyChef'
                  type='text'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  disabled={!modify}
                />
              </div>
              <div>
                <label className='text-black mr-60 p-0  text-lg font-medium'>
                  Email
                </label>
                <input
                  className='inline-block w-full shrink-1 focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
                  placeholder='mail@user.com'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={!modify}
                />
              </div>
              {/* <div>
                <label className='text-black mr-60 p-0  text-lg font-medium'>
                  Name
                </label>
                <input
                  className='inline-block w-full focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div> */}
              <div>
                <label className='text-black mr-60 p-0  text-lg font-medium'>
                  Gender
                </label>
                <select
                title='gender'
                  className='  inline-block  w-full shrink-1 focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                  disabled={!modify}
                >
                  <option value='Female'>Female</option>
                  <option value='Male'>Male</option>
                  <option value='Non Binary'>Non Binary</option>
                  <option value='Prefer not to say'>Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className='mb-4'>
              <Button
                className=' save mt-2 w-1/2 mx-auto bg-primary disabled:hidden '
                fullWidth
                type='submit'
                disabled={!modify}
                onClick={lockForm}
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
