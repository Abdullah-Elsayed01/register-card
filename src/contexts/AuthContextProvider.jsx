import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const signUpUser = async (username, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });
    if (error) {
      console.error(error);
      return { success: false, data };
    }
    return { success: true, data };
  };
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  };
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      // Error from response
      if (error) {
        console.error(error);
        return { success: false, data };
      }
      console.log("User Singed In 👍");
      return { success: true, data };
    } catch (error) {
      // Outer Error
      console.error(`Opps.. There Was an Error Accurred`, error);
    }
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session, signUpUser, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => useContext(AuthContext);
