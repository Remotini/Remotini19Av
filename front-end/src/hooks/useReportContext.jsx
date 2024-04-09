import { ReportCotne } from "../context/ReportCotne";
import { useContext } from "react";
export const useReportContext = () => {
  const context = useContext(ReportCotne);
  console.log(context, "context");
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
