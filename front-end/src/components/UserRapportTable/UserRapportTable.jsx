import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const UserRapportTable = ({ employeeId,clickedUser,setClickedUser,setEmployeeId ,userFullName}) => {
  // State to store user rapports array
  const [userRapportsArray, setUserRapportsArray] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch user rapports from server on component mount
  useEffect(() => {
    // Retrieve stored data from local storage
    const storedData = localStorage.getItem("rapportsArray");
    if (storedData) {
      setUserRapportsArray(JSON.parse(storedData));
    }
  }, []); // This effect runs only on component mount

  useEffect(() => {
    // Fetch user rapports from server when current user is available
    const chefId = user.id;
    console.log("currentUser", user);
    console.log("chefId", chefId);
    console.log("employeeId", employeeId);
    const fetchUserRapports = async () => {
      try {
        if (chefId) {
          const response = await axios.get(
            `http://localhost:5001/api/chef/getreports`,
            {
              params: {
                chefId: chefId,
                employeeId: employeeId,
              },
            }
          );
          const data = response.data;
          setUserRapportsArray(data);
          console.log("Rapports fetched successfully:", data);
          // Store fetched data in local storage
          localStorage.setItem("rapportsArray", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching rapports:", error);
      }
    };

    fetchUserRapports();
  }, [user]); // This effect runs when currentUser.id changes

  return (
    <div className="wrapperTable">
      <div className="rapport-desc">
      <div
            className="back-button"
            onClick={() => {
              setClickedUser(!clickedUser);
              setEmployeeId(null);
              
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        <span>Rapports de {userFullName}</span>
      </div>

      <div className="table-head">
        <div className="left">Rapports</div>
        <div className="search">
          <input
            type="search"
            className="search-input"
            placeholder="Rechercher..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="30"
            fill="#838383"
            className="dots"
            viewBox="6 0 6 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
      </div>

      <div className="table">
        <table className="tableaux-rapport">
          <thead>
            <tr className="elhead">
              <th width={"60%"}>Nom du Rapport</th>
              <th width={"20%"}>Date d'envoie</th>
              <th>Nombre de taches</th>
            </tr>
          </thead>

          <tbody>
            {userRapportsArray.map((rapport, index) => (
              <tr key={index}>
                <td>{rapport.name}</td>
                <td>{rapport.createdAt}</td>
                <td>{rapport.tasks.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-table"></div>
    </div>
  );
};

export default UserRapportTable;
