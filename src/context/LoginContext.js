import React, { useState, createContext } from "react";

// Create Context Object
export const LoginContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const LoginContextProvider = props => {
  let loginValue = false;
  if(localStorage.getItem('authToken')){
    loginValue = true;
  }
  else {
    loginValue = false;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(loginValue);

  return (
    <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  );
};