import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let status = "inactive";

  if (token) {
    const decoded = jwtDecode(token);
    const { username } = decoded.UserData;

    return { username, status };
  }

  return { username: "", status };
};
export default useAuth;
