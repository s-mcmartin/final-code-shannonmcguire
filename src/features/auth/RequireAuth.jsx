import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { status } = useAuth();

  

  return <>{status === 'active' ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />} </>;
};
export default RequireAuth;
