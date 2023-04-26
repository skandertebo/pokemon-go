import { Link } from 'react-router-dom';
import Register from './RegisterComp';
import { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';

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
    <form
      className='max-w-screen-md w-3/4 mx-auto p-5 my-56 md:mr-[100px] md:mb-[380px] md:w-[600px]'
      onSubmit={handleSubmit}
    >
      <h1 className='text-xl text-center bg-primary rounded-md text-white px-4 py-2 font-bold md:text-yellow'>
        Time To Catch Some Pokemons!
      </h1>
      <div className='m-4'>
        <input
          className='w-full h-14 px-2.5 rounded-md border-solid border-2 md:w-[400px]'
          type='email'
          id='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Enter Your Email'
        />
      </div>
      <div className='m-4 '>
        <input
          className='w-full h-14 px-2.5 rounded-md border-solid border-2 md:w-[400px]'
          type='password'
          id='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          placeholder='Enter Your Password'
        />
      </div>
      <div className='m-4 mb-3'>
        <Button className='w-3/4 h-14 rounded-md shadow-lg font-bold text-white md:w-[300px] bg-primary'>
          Login
        </Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Typography
          variant='paragraph'
          className='text-lg px-2 py-1 bg-white text-black rounded-lg'
        >
          Don't have an account?
        </Typography>
        <Link
          className='text-lg italic bg-primary text-white px-3 shadow-lg py-1 rounded-xl'
          to='/register'
        >
          Join Us
        </Link>
      </div>
    </form>
  );
}

export default LoginComp;
