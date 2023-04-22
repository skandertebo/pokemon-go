import {Link} from 'react-router-dom';
import Register from './RegisterComp';
import { useState } from 'react';
import { Button } from '@material-tailwind/react';

interface FormValues {
  email: string;
  password: string;
}

function LoginComp() {
  const [values, setValues] = useState<FormValues>({ email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className='text-center max-w-screen-md w-3/4 m-auto p-5
    md:p-1/5 md:mb-[100px] md:ml-[100px] md:w-[400px] 
    lg:mr-[100px] lg:mb-[350px] lg:w-[600px]' onSubmit={handleSubmit}> 
        <h1 className='text-lg text-primary font-bold md:text-primary lg:text-secondary '>Time To Catch Some Pokemons</h1>
      <div className='m-4'>
        <input className='w-full h-12 px-2.5 rounded-md border-solid border-2 md:w-[300px] lg:w-[400px]' type="email" id="email" name="email" value={values.email} onChange={handleChange} placeholder='Enter Your Email'/>
      </div>
      <div className='m-4 '>
        <input className='w-full h-12 px-2.5 rounded-md border-solid border-2 md:w-[300px] lg:w-[400px]' type="password" id="password" name="password" value={values.password} onChange={handleChange} placeholder='Enter Your Password'/>
      </div>
      <div className='m-4 mb-3'>
      <Button className="bg-primary w-3/4 h-12 rounded-md font-bold text-secondary md:w-[200px] lg:w-[300px]">Login</Button>
      </div>
      <div>
      <h2 className='text-primary text-base'>Don't have an account? 
      <a className='text-lg font-bold text-primary italic hover:not-italic' href='/register'> Join Us</a>
      </h2>
      </div>
    </form>
  );
}

export default LoginComp;
