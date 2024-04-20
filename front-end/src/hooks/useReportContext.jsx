import { ReportCotne } from "../context/ReportCotne";
import { useContext } from "react";
export const useReportContext = () => {
  const context = useContext(ReportCotne);
  if (!context) {
    throw Error("There's an error in the fetching of reports");
  }
  return context;
};
