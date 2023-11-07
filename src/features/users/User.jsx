import { memo } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/admin/users/${userId}`);

    return (
      <tr className="">
        <td className={``}>{user.username}</td>
        <td className={``}>{user.password}</td>

        <td className={``}>
          <button className="icon-button table__button" onClick={handleEdit}>
            Edit
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);
export default memoizedUser;
