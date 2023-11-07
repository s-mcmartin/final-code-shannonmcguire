import EditUserForm from "./EditUserForm";
import { RingLoader } from "react-spinners";
import { useGetUsersQuery } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle("SM_Portfolio: Edit User");

  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <RingLoader />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
