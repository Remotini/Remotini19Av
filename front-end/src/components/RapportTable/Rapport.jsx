import React, { useContext, useEffect, useState } from "react";
import "./Rapport.css";
import Maintable from "../Maintable/Maintable";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
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
  const handleDeleteReport = async (id) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce rapport?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "royalblue",
      cancelButtonColor: "gray",
      confirmButtonText: "Confirmer",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5001/api/reports/${id}`
        );
        console.log(response.data.message);
        if (response.status === 200) {
          await Swal.fire("Supprimé", response.data.message, "success");
          const newRapports = rapports.filter((rapport) => rapport._id !== id);
          setRapports(newRapports);
        }
      } catch (error) {
        console.error("Error deleting report:", error);
        await Swal.fire("Error!", "Failed to delete rapport.", "error");
      }
    }
  };
  const handleAddReport = async () => {
    try {
      const newReport = {
        nom: report.nom,
        description: "osef",
        createdAt: date.toLocaleDateString(),
        updatedAt: "",
      };
      const response = await axios.post(
        `http://localhost:5001/api/reports/user/${user.id}`,
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
        Swal.fire("Rapport ajouté!", "Le rapport a été ajouté.", "success");
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
  const handleEditRepport = async (rapport) => {
    const { value: updatedRapportName } = await Swal.fire({
      title: "Modifier le nom du rapport",
      input: "text",
      inputValue: rapport.nom, // Prefill the input with current rapport name
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Vous devez saisir un nom pour le rapport!";
        }
      },
      confirmButtonColor: "royalblue", // Set the color of the confirm button to royalblue
      cancelButtonColor: "gray", // Set the color of the cancel button to red
      confirmButtonText: "Modifier", // Set the text of the confirm button to "Modifier"
      cancelButtonText: "Annuler", // Set the text of the cancel button to "Annuler"
    });
    if (updatedRapportName) {
      console.log("Updated rapport name:", updatedRapportName);
      try {
        console.log(rapport._id);

        await axios.put(`http://localhost:5001/api/reports/${rapport._id}`, {
          nom: updatedRapportName,
        });

        Swal.fire(
          "Rapport mis à jour!",
          "Le rapport a été modifié.",
          "success"
        );

        // Refresh the rapport data
        setRapports((prevRapports) =>
          prevRapports.map((rap) =>
            rap._id === rapport._id ? { ...rap, nom: updatedRapportName } : rap
          )
        );
        // setRapports((prevRapports) =>
        //   prevRapports.filter((rap) => rap._id !== rapport._id)
        // );
      } catch (error) {
        console.error("Error updating rapport:", error);
        Swal.fire(
          "Erreur!",
          "Une erreur est survenue lors de la mise à jour du rapport.",
          "error"
        );
      }
    }
    // setEditReport(true);
    setRapport(rapport);
  };
  useEffect(() => {
    // Fetch data from the backend
    const fetchReports = async () => {
      try {
        console.log(user.id);
        const response = await axios.get(
          `http://localhost:5001/api/reports/user/${user.id}`
        );
        if (response.data.userReports) {
          setRapports(response.data.userReports);
          console.log(
            "Reports fetched successfully:",
            response.data.userReports
          );
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
          <div className="rapport-desc">Bienvenue Mr {user.prenom}</div>
          <div className="rap-table-head">
            <h3 className="titleHeaderRapport">Rapport</h3>
            <div className="rap-search">
              <input
                type="search"
                className="rap-search-input"
                placeholder="Rechercher..."
              ></input>
              <span
                className="rap-plus-icon"
                // onMouseEnter={() => setHoverPlus(true)}
                // onMouseLeave={() => setHoverPlus(false)}
              >
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
                {rapports
                  .filter((rapport) => !rapport.disabled)
                  .map((rapport, index) => (
                    <tr
                      key={index}
                      className={
                        "rap-report-row " +
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
                                style={
                                  action
                                    ? { color: "#3e4676", opacity: "1" }
                                    : {}
                                }
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
                                    // onClick={() => handleRowRapport(rapport._id)}
                                    onClick={() =>
                                      handleDeleteReport(rapport._id)
                                    }
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
