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
    <Card className=' bg-secondary drop-shadow-2xl mx-auto rounded-2xl'>
      <Button
        className=' mod_button hover:transform hover:scale-105 hover:transition hover:duration-200 bg-third relative left-175 bottom-50 ml-auto rounded-full h-20 border-none w-20'
        onClick={lockForm}
        disabled={modify}
      >
        <AiFillEdit className='text-white text-4xl my-auto  self-center' />
      </Button>
      <div className='mt-5 font-sans'>
        <Typography variant='h4' color='blue-gray'>
          Profile!
        </Typography>
        <Typography color='gray' className='mt-1  font-normal'>
          Edit your profile by clicking on the edit button
        </Typography>
      </div>
      <div>
        <form className='mt-10 mb-2 mx-auto w-80  ' onSubmit={handleSave}>
          <div>
            <img
              src={imagePreview || avatar}
              alt='image avatar'
              className='mx-auto mb-10 w-[250px] h-[250px] rounded-full border-8 border-third p-3 justify-self-center flex '
            />
            <div className='mb-8'>
              <label className='  hover:text-third   rounded-full text-lg '>
                {modify ? <div>Edit profile picture</div> : <div></div>}
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
          <div className='mb-4 flex flex-col gap-6'>
            <div>
              <label className='text-black mr-60 p-0  text-lg font-medium'>
                UserName
              </label>
              <input
                className='inline-block w-full focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
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
                className='inline-block w-full focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
                placeholder='mail@user.com'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={!modify}
              />
            </div>
            <div>
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
            </div>
            <div>
              <label className='text-black mr-60 p-0  text-lg font-medium'>
                Gender
              </label>
              <select
                className='  inline-block  w-full focus:outline-none  rounded-full bg-transparent  p-3 leading-relaxed text-fourth placeholder-primary shadow focus:shadow-third  placeholder:opacity-50'
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

          <div className='mb-10'>
            <Button
              className=' save mt-6 bg-primary disabled:hidden '
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
  );
};

export default Profile;