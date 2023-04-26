import LoginComp from '../components/LoginComp';

function Login() {
  return (
    <div className="flex bg-[url('/images/login.jpg')] md:bg-[url('https://wallpaperaccess.com/full/1360529.jpg')] h-screen md:items-center lg:items-end md:shrink-0 bg-cover md:justify-end">
      <LoginComp />
    </div>
  );
}

export default Login;
