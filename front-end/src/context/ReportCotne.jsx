import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
export const ReportCotne = createContext();

const RappportProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [rapports, setRapports] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log("user from context", user);
  if (user === null) {
    <Navigate to="/Login" />;
  }
  const fetchReports = async () => {
    if (user) {
      const response = await axios.get(
        `http://localhost:5001/api/reports?userId=${user.id}`
      );

      if (response.data) {
        setRapports(response.data);
      } else {
        console.log("Error fetching reports mel context");
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);

  // useEffect(() => {
  //   const fetchReports = async () => {
  //     if (user) {
  //       console.log("fetching reports for user", user.id);
  //       const response = await axios.get(
  //         `http://localhost:5001/api/reports?userId=${user.id}`
  //       );
  //       console.log("fetched ", response.data);
  //       if (response.data) {
  //         setRapports(response.data);
  //         console.log(
  //           "Reports fetched successfully mel context :",
  //           response.data
  //         );
  //       } else {
  //         console.log("Error fetching reports mel context");
  //       }
  //     }
  //   };
  //   fetchReports();
  // }, [user]);
  if (loading) {
    return <h1>Loading Reports ...</h1>;
  }
  return (
    <ReportCotne.Provider value={rapports}>{children}</ReportCotne.Provider>
  );
};
export default RappportProvider;
