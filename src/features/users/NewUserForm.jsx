import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const NewUserForm = () => {
  useTitle("SM_Portfolio: New User Form");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");

      navigate("/admin/users");
    }
  }, [isSuccess, navigate]);

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading && username !== "") {
      await addNewUser({
        username,
        password,
      });
    }
  };

  return (
    <>
      {isLoading && <RingLoader />}
      {isError && <p>{error?.data?.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2>New User</h2>
          <div className="">
            <label className="" htmlFor="username">
              Username
            </label>
            <input
              className=""
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
            <label className="" htmlFor="password">
              Password
            </label>
            <input
              className=""
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />

            <button
              className=""
              title="Save"
              disabled={username === "" ? true : false}
            >
              Add New User
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewUserForm;
