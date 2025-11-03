import { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([
    { id: 1, location: '12 Main St', description: 'Leaking hose', lat: -20.15, lng: 28.58 },
  ]);

  const addReport = (report) => {
    setReports([...reports, { ...report, id: Date.now() }]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);