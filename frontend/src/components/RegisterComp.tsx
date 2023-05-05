import React, { useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import './Register.css';
import { registerUser } from '../apiCalls/register';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RegisterBody } from '../types/RegisterBody';

function RegisterComp() {
  const { setToken } = useAuthContext() as {
    setToken: React.Dispatch<React.SetStateAction<string>>;
  };

  const [error, setError] = useState();

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterBody>({
    playerTag: '',
    email: '',
    password: '',
    image: '',
    role: 'player'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await registerUser(registerData);
      if (userData.error) {
        throw new Error(userData.error.message);
      }
      setToken(userData.token);
      navigate('/');
    } catch (error) {
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <form
      className='text-center max-w-screen-md w-full m-auto p-5 mb-[190px]
    md:p-1/5 md:mb-[100px] md:mr-[100px] md:w-[400px] 
    lg:mr-[100px] lg:mb-[350px] lg:w-[600px]'
      onSubmit={handleSubmit}
    >
      <div className='m-3.5'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]'
          type='text'
          id='playerTag'
          name='playerTag'
          value={registerData.playerTag}
          onChange={handleChange}
          placeholder='Enter your playerTag'
        />
      </div>
      <div className='m-3.5'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]'
          type='email'
          id='email'
          name='email'
          value={registerData.email}
          onChange={handleChange}
          placeholder='Enter your Email'
        />
      </div>
      <div className='m-3.5'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]'
          type='password'
          id='password'
          name='password'
          value={registerData.password}
          onChange={handleChange}
          placeholder='Enter Your Password'
        />
      </div>
      <div className='lg:m-3.5'>
        <input
          className='image w-fill text-right h-12 px-2.5 rounded-md lg:w-[400px]  text-primary'
          type='file'
          id='image'
          name='image'
          onChange={handleChange}
          value={registerData.image}
          accept='image/*'
        />
      </div>
      <div>
        <Button
          className='bg-primary  w-3/4 h-12 rounded-md font-bold text-secondary md:w-[300px] lg:w-[300px] disabled:bg-secondary disabled:text-primary'
          type='submit'
        >
          Register
        </Button>
      </div>
      {error && (
        <div
          className='p-2 rounded-md mt-4 bg-red-500 text-white text-center mx-auto'
          style={{ width: 'fit-content' }}
        >
          {error}
        </div>
      )}
    </form>
  );
}

export default RegisterComp;
