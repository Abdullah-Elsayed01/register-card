import { useState, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userInfo = createContext();

export const UserInfoProvider = ({children}) => {
  const [account, setAccount] = useState({userName: '',email: '', password: ''})
  const value = {
    account,
    setAccount
  }
  return( 
  <userInfo.Provider value={value}>
    {children}
  </userInfo.Provider>
  )
}

