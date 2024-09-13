import React, { createContext, useState, useContext, useEffect } from 'react';
const AppContext = createContext({});

export const useGlobalVariables = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

  const [globalProjectId, setGlobalProjectId] = useState(null);
  const [selectedNavBar, setSelectedNavBar] = useState('');
  const [logginUser, setLogginUser] = useState({ id: null, username: null });

  return (
    <AppContext.Provider value={{
      selectedNavBar, setSelectedNavBar,
      globalProjectId, setGlobalProjectId,
      logginUser, setLogginUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
