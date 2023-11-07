import LoginForm from "../../features/auth/LoginForm";
import useTitle from '../../hooks/useTitle'

const Login = () => {
  useTitle('SM_Portfolio: Admin Login Page')
  return <div className='w-full h-[80vh] flex justify-center items-center'><LoginForm /></div>;
};

export default Login;
