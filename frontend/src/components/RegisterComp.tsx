import React, { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

interface FormValues {
  userName: string;
  lastName: string;
  email: string;
  password: string;
}

function RegisterComp() {
  const [values, setValues] = useState<FormValues>({
    userName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className='max-w-screen-md w-3/4 mx-auto p-5 my-60 md:mr-[100px] md:mb-[350px] md:w-[600px]'
      onSubmit={handleSubmit}
    >
      <div className='m-5'>
        <input
          className='w-full h-14 px-2.5 rounded-md border-solid border-2 md:w-[400px]'
          type='text'
          id='UserName'
          name='UserName'
          value={values.userName}
          onChange={handleChange}
          placeholder='Enter your Username'
        />
      </div>
      <div className='m-5'>
        <input
          className='w-full h-14 px-2.5 rounded-md border-solid border-2 md:w-[400px]'
          type='email'
          id='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='Enter your Email'
        />
      </div>
      <div className='m-5'>
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
      <div className='m-5'>
        <Button
          className='w-3/4 h-14 rounded-md shadow-lg font-bold text-white md:w-[300px] bg-primary'
          type='submit'
        >
          Register
        </Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Typography
          variant='paragraph'
          className='text-lg px-2 py-1 bg-white text-black rounded-lg'
        >
          Already have an account?
        </Typography>
        <Link
          className='text-lg italic bg-primary text-white px-3 shadow-lg py-1 rounded-xl'
          to='/login'
        >
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegisterComp;
