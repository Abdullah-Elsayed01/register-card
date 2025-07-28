import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
function Card() {
  const [message, setMessage] = useState("");
  const handleMessage = (message) => {
    setMessage(message);
  };
  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <div>
      <>
        <div className="card">
          <header>
            <div className="button back">
              <KeyboardArrowLeftIcon />
            </div>
            <h1>Welcome There</h1>
          </header>
          <main className="main">
            <Outlet context={{ handleMessage }} />
          </main>
        </div>
      </>
    </div>
  );
}
export default Card;
