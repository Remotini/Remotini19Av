import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
export const ReportCotne = createContext();

const RappportProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [rapports, setRapports] = useState(null);
  useEffect(() => {
    if (user) {
      console.log("fetching reports for user", user.id);
      axios
        .get(`http://localhost:5001/api/reports/user/${user.id}`)
        .then((res) => {
          setRapports(res.data);
          console.log(" hedhom reports ", res.data);
        })
        .catch((error) => {
          console.log("Error fetching reports:", error);
        });
    }
  }, [user]);
  console.log("ReportContext state : ", rapports);
  return (
    <ReportCotne.Provider value={rapports}>{children}</ReportCotne.Provider>
  );
};
export default RappportProvider;
