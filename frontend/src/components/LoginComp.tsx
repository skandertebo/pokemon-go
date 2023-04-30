import {Link} from 'react-router-dom';
import Register from './RegisterComp';
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { loginUser,loginBody } from '../apiCalls/login';


function LoginComp() {

  const [loginData, setLoginData] = useState<loginBody>({
    email: '',
    password: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await loginUser(loginData);
      localStorage.setItem('token', userData.token); // Store token in local storage
      console.log('User logged in successfully:', userData);
    } catch (error) {
      console.error('Error logging: ', error);
    }
  };

  return (
    <form className='text-center max-w-screen-md w-full m-auto p-5 mb-[260px]
    md:p-1/5 md:mb-[100px] md:mr-[100px] md:w-[400px] 
    lg:mr-[100px] lg:mb-[350px] lg:w-[600px]' onSubmit={handleSubmit}> 
        <h1 className='text-sm text-primary font-bold md:text-primary lg:text-secondary '>Time To Catch Some Pokemons</h1>
      <div className='m-4'>
        <input className='w-full h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]' type="email" id="email" name="email"  value={loginData.email} onChange={handleInputChange} placeholder='Enter Your Email'/>
      </div>
      <div className='m-4 '>
        <input className='w-full h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]' type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange} placeholder='Enter Your Password'/>
      </div>
      <div className='m-4 mb-3'>
      <Button className="bg-primary w-3/4 h-12 rounded-md font-bold text-secondary md:w-[300px] lg:w-[300px]" type='submit'>Login</Button>
      </div>
      <div>
      <h2 className='text-primary text-base'>Don't have an account? 
      <a className='text-base font-bold text-primary italic hover:not-italic md:text-secondary lg:text-primary' href='/register'> Join Us</a>
      </h2>
      </div>
    </form>
  );
}

export default LoginComp;
