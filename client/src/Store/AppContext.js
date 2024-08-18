import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({});

export const useGlobalVariables = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);
  return (
    <AppContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </AppContext.Provider>
  );
};
