import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { UserAuth } from "../contexts/AuthContextProvider";
const UserPage = () => {
  const { session, signOut } = UserAuth();
  console.log(session);
  return (
    <div className="login-message">
      <p>Welcome To Your Account</p>
      <div className="check">
        <CheckCircleIcon />
      </div>
    </div>
  );
};

export default UserPage;
