import { useNavigate } from "react-router";
import { UserAuth } from "../contexts/AuthContextProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const WelcomePage = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="login-message success">
        <p>Welcome To Your Account, {session?.user?.username}</p>
        <div className="check">
          <CheckCircleIcon />
        </div>
        <button className="button" onClick={() => handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
};
export default WelcomePage;
