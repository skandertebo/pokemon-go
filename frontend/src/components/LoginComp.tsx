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
    <form className='max-w-screen-md w-3/4 mx-auto p-5 my-56 md:mr-[100px] md:mb-[380px] md:w-[600px]' onSubmit={handleSubmit}>
        <h1 className='text-xl text-blue font-bold md:text-yellow'>Time To Catch Some Pokemons</h1>
      <div className='m-4'>
        <input className='w-full h-14 px-2.5 rounded-md border-solid border-2 md:w-[400px]' type="email" id="email" name="email" value={values.email} onChange={handleChange} placeholder='Enter Your Email'/>
      </div>
      <div className='m-4 '>
        <input className='w-full h-14 px-2.5 rounded-md border-solid border-2 md:w-[400px]' type="password" id="password" name="password" value={values.password} onChange={handleChange} placeholder='Enter Your Password'/>
      </div>
      <div className='m-4 mb-3'>
      <Button className="bg-blue w-3/4 h-14 rounded-md font-bold text-yellow md:w-[300px]">Login</Button>
      </div>
      <div>
      <h2 className='text-blue text-lg'>Don't have an account? 
      <a className='text-xl font-bold text-blue italic hover:not-italic' href='/register'> Join Us</a>
      </h2>
      </div>
    </form>
  );
}

export default LoginComp;
