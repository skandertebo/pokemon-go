import { Link, useNavigate } from 'react-router-dom';
import Register from './RegisterComp';
import { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { loginUser } from '../apiCalls/login';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LoginBody } from '../types/LoginBody';

function LoginComp() {
  const { token, setToken } = useAuthContext() as {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
  };

  const [loginData, setLoginData] = useState<LoginBody>({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await loginUser(loginData);
      if (userData.error) {
        throw new Error(userData.error.message);
      }
      setToken(userData.token);
      window.location.reload();
    } catch (error) {
      //@ts-ignore
      setError(error.message);
    }
  };

  if (token) {
    return <Navigate to={'/'} />;
  }

  return (
    <form
      className='text-center max-w-screen-md w-full m-auto p-5 mb-[240px]
    md:p-1/5 md:mb-[100px] md:mr-[100px] md:w-[400px] 
    lg:mr-[100px] lg:mb-[350px] lg:w-[600px]'
      onSubmit={handleSubmit}
    >
      <h1
        className='text-lg text-primary font-bold md:text-primary bg-white p-4 rounded-md mx-auto'
        style={{ width: 'fit-content' }}
      >
        Time To Catch Some Pokemons!
      </h1>
      <div className='m-4'>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]'
          type='email'
          id='email'
          name='email'
          value={loginData.email}
          onChange={handleInputChange}
          placeholder='Enter Your Email'
        />
      </div>
      <div className='m-4 '>
        <input
          className='w-full h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]'
          type='password'
          id='password'
          name='password'
          value={loginData.password}
          onChange={handleInputChange}
          placeholder='Enter Your Password'
        />
      </div>
      <div className='m-4 mb-3'>
        <Button
          className='bg-primary w-3/4 h-12 rounded-md font-bold text-secondary md:w-[300px] lg:w-[300px]'
          type='submit'
        >
          Login
        </Button>
        {error && (
          <div
            className='p-2 rounded-md mt-4 bg-red-500 text-white text-center mx-auto'
            style={{ width: 'fit-content' }}
          >
            {error}
          </div>
        )}
      </div>
      <div>
        <h2
          className='text-primary text-base bg-white mx-auto px-4 py-1 rounded-md'
          style={{ width: 'fit-content' }}
        >
          Don't have an account?
          <Link
            className='text-base font-bold text-primary italic hover:not-italic md:text-secondary lg:text-primary'
            to='/register'
          >
            Join Us
          </Link>
        </h2>
      </div>
    </form>
  );
}

export default LoginComp;
