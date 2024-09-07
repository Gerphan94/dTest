import React, { createContext, useState, useContext, useEffect } from 'react';
const CaseContext = createContext({});

export const useCase = () => useContext(CaseContext);

export const CaseProvider = ({ children }) => {

  const urlAPI = process.env.REACT_APP_API_URL;
  const [sectionId, setSectionId] = useState(null);
  const [caseTotal, setCaseTotal] = useState(0);
  const [caseData, setCaseData] = useState([]);

  const [selectedCaseId, setSelectedCaseId] = useState(null);



  // const fetchCaseByProject = async (project_id) => {
  //   try {
  //     const response = await fetch(urlAPI + '/api/get-cases-by-project/' + project_id);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setAllCases(data);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };

  return (
    <CaseContext.Provider value={{
      sectionId, setSectionId,
      caseTotal, setCaseTotal,
      caseData, setCaseData,
      selectedCaseId, setSelectedCaseId,
    }}>
      {children}
    </CaseContext.Provider>
  );
};
