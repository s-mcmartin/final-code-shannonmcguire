import { useEffect, useRef, useState } from "react";

import { RingLoader } from "react-spinners";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import MainSection from '../../components/MainSection'

const LoginForm = () => {
  useTitle("SM_Portfolio: Login Form");
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/admin");
    } catch (err) {
      if (!err.status) {
        setErrMessage("No Server Response");
      } else if (err.status === 400) {
        setErrMessage("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  isLoading && <RingLoader />;

  return (
    <MainSection>
      <p>{errMessage}</p>
    <div className='w-full h-full flex justify-center'>
        <form onSubmit={handleSubmit} className='bg-dark dark:bg-light text-light dark:text-dark flex flex-wrap justify-center items-center flex-col w-1/3 md:w-full px-8 py-2 rounded-lg'>
          <label htmlFor="username" className='font-semibold text-xl w-full text-left my-2'>Username</label>
          <input
          className='w-full text-xl rounded-sm text-dark/75 px-2 mb-1'
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password" className='font-semibold text-xl w-full text-left my-2'>Password</label>
          <input
           className='w-full text-xl rounded-sm text-dark/75 px-2'
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            autoComplete="off"
            required
          />
          <button className='w-full my-6 mt-8 bg-primaryDark p-1 text-xl rounded-md font-bold text-dark cursor-pointer shadow-lg shadow-black'>Sign In</button>
          <label htmlFor="persist" className="text-lg">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
              
            />
           &nbsp; Trust This Device
          </label>
        </form>
   </div>
    </MainSection>
  );
};

export default LoginForm;
