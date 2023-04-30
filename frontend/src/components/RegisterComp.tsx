import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import './Register.css'

interface FormValues {
    UserName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  function RegisterComp() {
    const [values, setValues] = useState({
      UserName: '',
      lastName: '',
      email: '',
      password: '',
      image: null
    });
  
    const handleChange = (e: { target: { name: any; value: any; type: any; files: any; }; }) => {
      const { name, value, type, files } = e.target;
      setValues((prevState) => ({
        ...prevState,
        [name]: type === 'file' ? files[0] : value // update image state if type is file
      }));
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
    };
  
    return (
   <form className='text-center max-w-screen-md w-full m-auto p-5 mb-[190px]
    md:p-1/5 md:mb-[100px] md:mr-[100px] md:w-[400px] 
    lg:mr-[100px] lg:mb-[350px] lg:w-[600px]' onSubmit={handleSubmit}> 
        <div className='m-3.5'>
          <input className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]' type="text" id="UserName" name="UserName" value={values.UserName} onChange={handleChange} placeholder='Enter your Username'/>
        </div>
        <div className='m-3.5'>
          <input className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]' type="email" id="email" name="email" value={values.email} onChange={handleChange} placeholder='Enter your Email'/>
        </div>
        <div className='m-3.5'>
          <input className='w-full h-12 px-2.5 rounded-md border-solid border-2 lg:w-[400px]' type="password" id="password" name="password" value={values.password} onChange={handleChange} placeholder='Enter Your Password'/>
        </div>
        <div className='lg:m-3.5'>
        <input className="image w-fill text-right h-12 px-2.5 rounded-md lg:w-[400px]  text-primary" type="file" id="image" name="image" onChange={handleChange} accept="image/*" /> 
        </div>
        <div>
          <Button className='bg-primary  w-3/4 h-12 rounded-md font-bold text-secondary md:w-[300px] lg:w-[300px] disabled:bg-secondary disabled:text-primary' type="submit" disabled>Register</Button>
        </div>
      </form>
    );
  }
  
  export default RegisterComp;

  