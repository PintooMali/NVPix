import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Rootstate } from "../app/store";

const PrivateRoutes = () => {
  const { user, isLoading } = useSelector(
    (state: Rootstate) => state.user.value
  );
  if (isLoading) return <div>Loading.....</div>;
  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
