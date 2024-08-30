import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useGlobalVariables = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  const [projectId, setProjectId] = useState(null);
  const [logginUser, setLogginUser] = useState({id: null, username: null});

  return (
    <AppContext.Provider value={{ projectId, setProjectId, logginUser, setLogginUser }}>
      {children}
    </AppContext.Provider>
  );
};
