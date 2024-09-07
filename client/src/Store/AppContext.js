import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useGlobalVariables = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  const [globalProjectId, setGlobalProjectId] = useState(null);
  const [logginUser, setLogginUser] = useState({id: null, username: null});

  return (
    <AppContext.Provider value={{ globalProjectId, setGlobalProjectId, logginUser, setLogginUser }}>
      {children}
    </AppContext.Provider>
  );
};
