import React, { useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { registerUser } from '../apiCalls/register';
import { useAuthContext } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RegisterBody } from '../types/RegisterBody';

function RegisterComp() {
  const { setToken, token } = useAuthContext()!;
  const [error, setError] = useState();

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
      window.location.reload();
    } catch (error) {
      console.error(error);
      //@ts-ignore
      setError(error.message);
    }
  };

  if (token) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
    <form
      className='text-center max-w-screen-md w-full m-auto p-5 mb-[240px]
    md:p-1/5 md:mb-[100px] md:mr-[100px] md:w-[400px] 
    lg:mr-[100px] lg:mb-[350px] lg:w-[600px]'
      onSubmit={handleSubmit}
    >
      <div className='m-2'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]'
          type='text'
          id='playerTag'
          name='playerTag'
          value={registerData.playerTag}
          onChange={handleChange}
          placeholder='Enter your playerTag'
          required
        />
      </div>
      <div className='m-2'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]'
          type='email'
          id='email'
          name='email'
          value={registerData.email}
          onChange={handleChange}
          placeholder='Enter your Email'
          required
        />
      </div>
      <div className='m-2'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]'
          type='password'
          id='password'
          name='password'
          value={registerData.password}
          onChange={handleChange}
          placeholder='Enter Your Password'
          required
        />
      </div>
      <div className='m-2'>
        <Button
          className='bg-primary  w-3/4 h-12 rounded-md font-bold text-secondary md:w-[300px] lg:w-[300px]'
          type='submit'
        >
          Register
        </Button>
      </div>
      <h2 className='text-primary text-l mx-auto text-bold'>
        Already have an account?
        <Link
          className='text-base font-bold text-primary italic hover:not-italic md:text-secondary lg:text-primary '
          to='/login'
        >
          {' '}
          Login
        </Link>
      </h2>
        </form>
      <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full '>
      {error && (
        <div
          className='p-2 rounded-md mt-4 bg-red-500 text-white text-center mx-auto'
          style={{ width: 'fit-content' }}
        >
          {error}
        </div>
      )}
      </div>
      </>
  );
}

export default RegisterComp;
