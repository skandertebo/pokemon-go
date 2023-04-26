import RegisterComp from '../components/RegisterComp';

function Login() {
  return (
    <div className="flex bg-[url('/images/regist.png')] md:bg-[url('https://wallpaperaccess.com/full/7289617.jpg')] h-screen md:items-center lg:items-end md:shrink-0 bg-cover">
      <RegisterComp />
    </div>
  );
}

export default Login;
