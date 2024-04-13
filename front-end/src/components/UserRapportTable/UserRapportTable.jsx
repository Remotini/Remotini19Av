import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRapportTable = () => {
  // State to store user rapports array
  const [userRapportsArray, setUserRapportsArray] = useState([]);

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
    const chefId = currentUser._id;

    if (chefId) {
      axios
        .get(`http://localhost:3001/chefhome/getreports?chefId=${chefId}`)
        .then((response) => {
          const data = response.data;
          setUserRapportsArray(data);
          // Store fetched data in local storage
          localStorage.setItem("rapportsArray", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching rapports:", error);
        });
    }
  }, []); // This effect runs only on component mount

  return (
    <div className="wrapperTable">
      <div className="rapport-desc"></div>

      <div className="table-head">
        <div className="left">Rapport</div>
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
