import LoginComp from '../components/LoginComp';

function Login() {
  return (
    <div className="flex bg-[url('/images/bg-login.png')] bg-center md:bg-left-top h-screen md:items-center lg:items-end  md:shrink-0 bg-cover md:justify-end">
      <LoginComp />
    </div>
  );
}

export default Login;
