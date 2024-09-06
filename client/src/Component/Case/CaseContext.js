import React, { createContext, useState, useContext, useEffect } from 'react';
const CaseContext = createContext({});

export const useCase = () => useContext(CaseContext);

export const CaseProvider = ({ children }) => {

  const urlAPI = process.env.REACT_APP_API_URL;
  const [sectionId, setSectionId] = useState(null);
  const [caseTotal, setCaseTotal] = useState(0);
  const [caseData, setCaseData] = useState([]);

  const [showRmModal, setShowRmModal] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);


  const fetchGetCaseDataBySection = async () => {
    try {
      const response = await fetch(urlAPI + '/api/get-cases-by-section/' + sectionId);
      if (response.ok) {
        const data = await response.json();
        setCaseTotal(data.length);
        setCaseData(data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  return (
    <CaseContext.Provider value={{
      sectionId, setSectionId,
      caseTotal, setCaseTotal,
      caseData, setCaseData,
      fetchGetCaseDataBySection,
      showRmModal, setShowRmModal,
      selectedCaseId, setSelectedCaseId
    }}>
      {children}
    </CaseContext.Provider>
  );
};
