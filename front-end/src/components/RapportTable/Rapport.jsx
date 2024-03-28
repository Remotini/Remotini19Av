import React, { useEffect, useState } from "react";
import "./Rapport.css";
import Maintable from "../Maintable/Maintable";
import axios from "axios";
function Rapport({ addTask, setAddTask }) {
  const [clickedTask, setClickedTask] = useState(false);
  const [rapports, setRapports] = useState([]);
  const [rapportId, setRapportId] = useState(null);
  const [rapportNom, setRapportNom] = useState(null);
  const handleTaskRapport = (rap) => {
    setRapportId(rap._id);
    setRapportNom(rap.nom);
  };
  // const [disabledRows, setDisabledRows] = useState([]);
  // const handleRowRapport = (id) => {
  //   setDisabledRows([...disabledRows, id]);
  // };

  useEffect(() => {
    //fetch data from the backend
    const fetchReports = async () => {
      const response = await axios.get("http://localhost:5001/api/reports");
      if (response) {
        console.log(response.data.reports);
        setRapports(response.data.reports);
      } else {
        console.log("error");
      }
      // try { using the normal fetch method
      //   const response = await fetch("http://localhost:5001/api/reports");
      //   if (response.ok) {
      //     const data = await response.json();
      //     setRapport(data.reports);
      //     console.log(rapport);
      //   } else {
      //     console.log("Error:", response.status);
      //   }
      // } catch (error) {
      //   console.log("Error:", error);
      // }
    };

    fetchReports();
  }, []);
  useEffect(() => {
    if (rapportId) {
      setClickedTask(true);
    }
  }, [rapportId]);
  return (
    <>
      {!clickedTask ? (
        <div className="rap-wrapperTable">
          <div className="rapport-desc">Rapport des taches</div>
          <p>aa</p>
          <div className="rap-table-head">
            {/* <div className="left">Taches</div> */}
            <div className="rap-search">
              <input
                type="search"
                className="rap-search-input"
                placeholder="Rechercher..."
              ></input>
              <span className="rap-plus-icon" onClick={() => setAddTask(true)}>
                +
              </span>
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

          <div className="rap-table">
            {/* table can be a seperate component if needed */}

            <table className="rap-tableaux-rapport">
              <tbody>
                <tr className="rap-elhead">
                  <th> Nom Rapport</th>
                  <th> Description</th>
                  <th>Date creation</th>
                  <th>Date modification</th>
                </tr>

                {rapports.map((rapport, index) => (
                  <tr
                    key={index}
                    // onClick={() => handleRowRapport(rapport._id)}
                    // className={
                    //   disabledRows.includes(rapport._id) ? "disabled" : ""
                    // }
                  >
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.nom}
                    </td>
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.description}
                    </td>
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {" "}
                      {rapport.createdAt}
                    </td>
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Maintable
          rapport_id={rapportId}
          rapport_nom={rapportNom}
          back_button={setClickedTask}
          state={clickedTask}
        />
      )}
    </>
  );
}
export default Rapport;
