import React, { useContext, useEffect, useState } from "react";
import "./Rapport.css";
import Maintable from "../Maintable/Maintable";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

function Rapport({
  addTask,
  setAddTask,
  editReport,
  setEditReport,
  setRapport,
  getRapportId,
  updatedTask,
  setTaskToEdit,
  setEditTask,
  setTask,
  setTaskCard,
}) {
  const [clickedTask, setClickedTask] = useState(false);
  const [rapports, setRapports] = useState([]);
  const [rapportId, setRapportId] = useState(null);
  const [rapportNom, setRapportNom] = useState(null);
  const [hoverPlus, setHoverPlus] = useState(false);
  const [disabledRows, setDisabledRows] = useState([]);
  const [addReport, setAddReport] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const [action, setAction] = useState(false);
  const [report, setReport] = useState({
    nom: "",
    date: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });
  const date = new Date();
  const { user } = useContext(AuthContext);
  const handleAddReport = async () => {
    try {
      const newReport = {
        nom: report.nom,
        description: "osef",
        createdAt: date.toLocaleDateString(),
        updatedAt: "",
      };
      const response = await axios.post(
        "http://localhost:5001/api/reports",
        newReport
      );
      if (response.data.report) {
        console.log("Report added successfully:", response.data.report);
        setRapports([...rapports, response.data.report]);
        setAddReport(false);
        setReport({
          nom: "",
          date: "",
          description: "",
          createdAt: "",
          updatedAt: "",
        });
      } else {
        console.log("Error adding report");
      }
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };

  const handleTaskRapport = (rap) => {
    setRapportId(rap._id);
    setRapportNom(rap.nom);
  };

  const handleRowRapport = (id) => {
    setDisabledRows([...disabledRows, id]);
  };

  const handleEditRepport = (rapport) => {
    setEditReport(true);
    setRapport(rapport);
  };

  useEffect(() => {
    // Fetch data from the backend
    const fetchReports = async () => {
      try {
        console.log("user", user);
        const response = await axios.get(`http://localhost:5001/api/reports/user/${user.id}`);
        if (response.data.userReports) {
          setRapports(response.data.userReports);
          console.log("Reports fetched successfully:", response.data.userReports);
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
      getRapportId(rapportId);
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
              <span
                className="rap-plus-icon"
                
                onMouseEnter={() => setHoverPlus(true)}
                onMouseLeave={() => setHoverPlus(false)}
              >
                <svg
                  className="material-symbols-outlined"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#fff"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </span>
              {hoverPlus && (
                <span className="ajoutstyle">Ajouter un rapport</span>
              )}
            </div>
          </div>

          <div className="rap-table">
            <table className="rap-tableaux-rapport">
              <tbody>
                <tr className="rap-elhead">
                  <th>Nom Rapport</th>
                  
                  <th>Date creation</th>
                  <th>Date modification</th>
                  {/* <th>Actions</th> */}
                </tr>
                
                {rapports.map((rapport, index) => (
                  <tr
                    key={index}
                    className={"rap-report-row "+
                      (disabledRows.includes(rapport._id) ? "disabled" : "")
                    }
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.nom}
                    </td>
                    
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.createdAt}
                    </td>
                    <td>
                      <div className="btn-edit">
                        <p onClick={() => handleTaskRapport(rapport)}>
                          {rapport.updatedAt}
                        </p>
                        {hoveredRow === index && (
                          <div
                            className="edit-icon"
                            onClick={() => {
                              setOpenOptions(
                                openOptions === index ? null : index
                              );
                              setAction(true);
                            }}
                            onMouseLeave={() => {
                              setOpenOptions(null);
                              setAction(false);
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={action ? { color: "#3e4676",opacity:"1" } : {}}
                            >
                              edit
                            </span>
                            {openOptions === index && (
                              <div className="options-list">
                                <button>Show</button>
                                <hr />
                                <button
                                  onClick={() => handleEditRepport(rapport)}
                                >
                                  Modify
                                </button>
                                <hr />
                                <button
                                  onClick={() => handleRowRapport(rapport._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                   
                  </tr>
                ))}
                {addReport && (
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        placeholder="Nom du rapport"
                        value={report.nom}
                        onChange={(e) =>
                          setReport({ ...report, nom: e.target.value })
                        }
                        className="input-nom-rapport"
                      />
                    </td>
                    
                    
                    <td>
                      
                      <div className="rap-action">
                        <button
                          className="rap-button add-button"
                          onClick={handleAddReport} // Call handleAddReport on button click
                        >
                          <span className="material-symbols-outlined">add</span>{" "}
                          Ajouter
                        </button>
                        <button
                          onClick={() => setAddReport(false)}
                          className="rap-button cancel-button"
                        >
                          <span className="material-symbols-outlined">
                            cancel
                          </span>{" "}
                          Annuler
                        </button>
                      </div>
                    </td>
                    
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="footer-table">
          <button
            type="button"
            className="button"
            onClick={() => setAddReport(true)}
          >
            <span className="button__text">Ajouter rapport</span>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
          

          
        </div>
        </div>
      ) : (
        <Maintable
          rapport_id={rapportId}
          rapport_nom={rapportNom}
          setRapportId={setRapportId}
          setRapportNom={setRapportNom}
          back_button={setClickedTask}
          state={clickedTask}
          setAddTask={setAddTask}
          updatedTask={updatedTask}
          setTaskToEdit={setTaskToEdit}
          setEditTask={setEditTask}
          setTask={setTask}
          setTaskCard={setTaskCard}
        />
      )}
    </>
  );
}

export default Rapport;
