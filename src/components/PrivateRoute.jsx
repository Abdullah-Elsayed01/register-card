import { Navigate } from "react-router";
import { UserAuth } from "../contexts/AuthContextProvider";

const PrivateRoute = (children) => {
  const { session } = UserAuth();
  return <div>{session ? <>{children}</> : <Navigate to="/signup" />}</div>;
};
export default PrivateRoute;
