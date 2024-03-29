import React, { useEffect, useState } from "react";
import "./Rapport.css";
import Maintable from "../Maintable/Maintable";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function Rapport({ addTask, setAddTask, editTask, setEditTask, setRapport }) {
  const [clickedTask, setClickedTask] = useState(false);
  const [rapports, setRapports] = useState([]);
  const [rapportId, setRapportId] = useState(null);
  const [rapportNom, setRapportNom] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [disabledRows, setDisabledRows] = useState([]);

  const handleTaskRapport = (rap) => {
    setRapportId(rap._id);
    setRapportNom(rap.nom);
  };

  const handleRowRapport = (id) => {
    setDisabledRows([...disabledRows, id]);
  };

  const handleEditRepport = (rapport) => {
    setEditTask(true);
    setRapport(rapport);
  };

  useEffect(() => {
    // Fetch data from the backend
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/reports");
        if (response.data.reports) {
          setRapports(response.data.reports);
        } else {
          console.log("Error fetching reports");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
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
          <div className="rap-table-head">
            <div className="rap-search">
              <input
                type="search"
                className="rap-search-input"
                placeholder="Rechercher..."
              ></input>
              <span className="rap-plus-icon" onClick={() => setAddTask(true)}>
                +
              </span>
            </div>
          </div>

          <div className="rap-table">
            <table className="rap-tableaux-rapport">
              <tbody>
                <tr className="rap-elhead">
                  <th>Nom Rapport</th>
                  <th>Description</th>
                  <th>Date creation</th>
                  <th>Date modification</th>
                  <th>Actions</th>
                  
                </tr>

                {rapports.map((rapport, index) => (
                  <tr
                    key={index}
                    className={
                      disabledRows.includes(rapport._id) ? "disabled" : ""
                    }
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.nom}
                    </td>
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.description}
                    </td>
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.createdAt}
                    </td>
                    <td onClick={() => handleTaskRapport(rapport)} >
                      {rapport.updatedAt}
                      
                    </td>
                    <td >
                      <div className="rap-action">

                    <button
                        onClick={() => handleEditRepport(rapport)}
                        className="rap-button"
                      >
                        <span className="material-symbols-outlined">edit</span>{" "}
                        Modifier
                      </button>
                      <button
                        className="rap-button"
                        onClick={() => handleRowRapport(rapport._id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>{" "}
                        Effacer
                      </button>
                      </div>
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
