import React, { useState, createContext } from "react";

// Create Context Object
export const LoginContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const LoginContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  );
};