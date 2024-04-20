// reportContext.jsx

import React, { createContext, useState } from "react";

// Create a new context
const ReportContext = createContext();

// Create a provider component
export const ReportProvider = ({ children }) => {
  // Set the initial value of report_id
  const [report_id, setReportId] = useState("");

  // Function to update the report_id value
  const updateReportId = (id) => {
    setReportId(id);
  };

  // Provide the report_id value and update function to all child components
  return (
    <ReportContext.Provider value={{ report_id, updateReportId }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContext;
