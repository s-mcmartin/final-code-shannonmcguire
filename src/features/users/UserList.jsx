import { RingLoader } from "react-spinners";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
import useTitle from "../../hooks/useTitle";

const UserList = () => {
  useTitle("SM_Portfolio: User List");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <RingLoader />;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const { ids } = users;
    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);
    content = (
      <table className="">
        <thead className="">
          <tr>
            <th scope="col" className="">
              Username
            </th>
            <th scope="col" className="">
              Password
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default UserList;
