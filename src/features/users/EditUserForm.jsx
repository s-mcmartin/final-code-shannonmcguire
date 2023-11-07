import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useEffect, useState } from "react";

import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EditUserForm = (user) => {
  useTitle("SM_Portfolio: Edit User Form");

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      navigate("/admin/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!isLoading && username !== "") {
      await updateUser({
        id: user.id,
        username,
        password,
      });
    }
  };

  const handleDeleteUser = async () => {
    await deleteUser({ id: user.id });
  };

  return (
    <>
      {isLoading && <RingLoader />}
      {isError && <p>{error?.data?.message}</p>}
      {isDelError && <p>{delError?.data?.message}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
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
              className="icon-button"
              title="Save"
              onClick={handleUpdateUser}
              disabled={username === "" ? true : false}
            >
              Update
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUserForm;
