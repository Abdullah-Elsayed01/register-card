import { UserAuth } from "../contexts/AuthContextProvider";
import { Navigate } from "react-router";
const PrivateRoute = (children) => {
  if (session === undefined) {
    return <div>Loading...</div>;
  }
  const { session } = UserAuth();
  return <div>{session ? <>{children}</> : <Navigate to="/signup" />}</div>;
};
export default PrivateRoute;
