import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Input from "../components/Input";
import { useState } from "react";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useNavigate, useOutletContext } from "react-router";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState({
    email: false,
    password: false,
  });
  const handleInputValid = (field, state) => {
    setInputValid({ ...inputValid, [field]: state });
  };
  const { signIn } = UserAuth();
  const { handleMessage } = useOutletContext();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!inputValid.email && !inputValid.password) {
      handleMessage("Please Fill All Fields");
      return;
    }
    try {
      handleMessage("User Signed In Successfully");
      await signIn(email, password);
      navigate("/user-page");
    } catch (err) {
      console.error(err);
      handleMessage("Sign In Error Occurred: ", err);
    }
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
        <Input
          htmlInputType="email"
          validationType="Email"
          onChange={setEmail}
          handleInputValid={handleInputValid}
        />
        <Input
          htmlInputType="password"
          validationType="Password"
          onChange={setPassword}
          handleInputValid={handleInputValid}
        />
        <div className="flex info">
          <h2>Sing In</h2>
          <button type="submit" className="button next">
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </form>
      <footer className="flex">
        <div onClick={() => navigate("/signup")} className="sign">
          Sign Up
        </div>
      </footer>
    </>
  );
};
export default SignIn;
