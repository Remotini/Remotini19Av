import { ReportCotne } from "../context/ReportCotne";
import { useContext } from "react";
export const useReportContext = () => {
  const context = useContext(ReportCotne);
  if (!context) {
    throw Error("el report provide ya wlidiii");
  }
  return context;
};
