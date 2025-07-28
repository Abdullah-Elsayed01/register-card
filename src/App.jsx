import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import SignUp from "./routes/SingUp";
import SignIn from "./routes/SignIn";
import UserPage from "./routes/WelcomePage";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute";
import Card from "./components/Card";
function App() {
  return (
    <>
      <BrowserRouter basename="/register-card">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Card />}>
              <Route index element={<Navigate to="/signin" />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route
              path="/user-page"
              element={
                <PrivateRoute>
                  <UserPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
