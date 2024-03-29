import React, { useEffect, useState } from "react";
import "./Rapport.css";
import Maintable from "../Maintable/Maintable";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

function Rapport({ addTask, setAddTask, editReport, setEditReport, setRapport }) {
  const [clickedTask, setClickedTask] = useState(false);
  const [rapports, setRapports] = useState([]);
  const [rapportId, setRapportId] = useState(null);
  const [rapportNom, setRapportNom] = useState(null);
  const [hoverPlus, setHoverPlus] = useState(false);
  const [disabledRows, setDisabledRows] = useState([]);
  const [addReport, setAddReport] = useState(false);
  const [report, setReport] = useState({
    nom: "",
    date: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });
  const date = new Date();

  const handleAddReport = async () => {
    try {
      const newReport = {
        nom: report.nom,
        description: report.description,
        createdAt: date.toLocaleDateString(),
        updatedAt: "",
      };
      const response = await axios.post("http://localhost:5001/api/reports", newReport);
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
  }

   


    // const newReport = {
    //   nom: report.nom,
    //   description: report.description,
    //   createdAt: date.toLocaleDateString(),
    //   updatedAt: "", 
    // };
    // setRapports([...rapports, newReport]);
    // setAddReport(false);
    // setReport({
    //   nom: "",
    //   date: "",
    //   description: "",
    //   createdAt: "",
    //   updatedAt: "",
    // });
 

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
              <span
                className="rap-plus-icon"
                onClick={() => setAddReport(true)}
                onMouseEnter={() => setHoverPlus(true) }
                onMouseLeave={() => setHoverPlus(false)}
              >
                <svg className="material-symbols-outlined"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#fff"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  />
                </svg>
              </span>
              {hoverPlus && <span className="ajoutstyle">Ajouter un rapport</span>}
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
                {addReport && (
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Nom du rapport"
                        value={report.nom}
                        onChange={(e) =>
                          setReport({ ...report, nom: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Description du rapport"
                        value={report.description}
                        onChange={(e) =>
                          setReport({ ...report, description: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Date de creation"
                        defaultValue={date.toLocaleDateString()}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Date de modification"
                        readOnly
                      />
                    </td>
                    <td>
                      <div className="rap-action">
                        <button
                          onClick={() => setAddReport(false)}
                          className="rap-button"
                        >
                          <span className="material-symbols-outlined">
                            cancel
                          </span>{" "}
                          Annuler
                        </button>
                        <button
                          className="rap-button"
                          onClick={handleAddReport} // Call handleAddReport on button click
                        >
                          <span className="material-symbols-outlined">add</span>{" "}
                          Ajouter
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                {rapports.map((rapport, index) => (
                  <tr
                    key={index}
                    className={
                      disabledRows.includes(rapport._id) ? "disabled" : ""
                    }
                
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
                    <td onClick={() => handleTaskRapport(rapport)}>
                      {rapport.updatedAt}
                    </td>
                    <td>
                      <div className="rap-action">
                        <button
                          onClick={() => handleEditRepport(rapport)}
                          className="rap-button"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>{" "}
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
          setAddTask={setAddTask}
        />
      )}
    </>
  );
}

export default Rapport;
