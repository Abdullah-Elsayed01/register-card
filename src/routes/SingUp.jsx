import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Input from "../components/Input";
import { useState } from "react";
import { UserAuth } from "../contexts/AuthContextProvider";
import { useNavigate, useOutletContext } from "react-router";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState({
    username: false,
    email: false,
    password: false,
  });
  const handleInputValid = (field, state) => {
    setInputValid({ ...inputValid, [field]: state });
  };
  const { signUpUser, session } = UserAuth();
  const { handleMessage } = useOutletContext();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!inputValid.username && !inputValid.email && !inputValid.password) {
      handleMessage("Please Fill All Fields");
      return;
    }
    try {
      handleMessage("User Signed Up Successfully");
      const { data, error } = await signUpUser(username, email, password);
      if (error) {
        handleMessage("Sign Up Error Occurred :", error);
      }
      console.log(data);
      navigate("/user-page");
    } catch (err) {
      console.error(err);
      handleMessage("Sign Up Error Occurred: ", err);
    }
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
        <Input
          validationType="Username"
          onChange={setUsername}
          handleInputValid={handleInputValid}
        />
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
          <h2>Sing Up</h2>
          <button type="submit" className="button next">
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </form>
      <footer className="flex">
        <div onClick={() => navigate("/signin")} className="sign">
          Sign In
        </div>
      </footer>
    </>
  );
};
export default SignUp;
