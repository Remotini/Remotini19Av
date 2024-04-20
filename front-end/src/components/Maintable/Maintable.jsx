import React, { useContext, useEffect, useState } from "react";
import "./Maintable.css";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
function Maintable(props) {
  const {
    rapport_nom,
    rapport_id,
    setRapportId,
    setRapportNom,
    back_button,
    state,
    setAddTask,
    updatedTask,
    setTaskToEdit,
    setEditTask,
    setTask,
    setTaskCard,
  } = props;
  const [Tasks, setTasks] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `http://localhost:5001/api/tasks?rapport_id=${rapport_id}`
      );
      if (response) {
        setTasks(response.data);
      } else {
        console.log("error");
      }
    };
    fetchTasks();
  }, [updatedTask]);
  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      // console.log(id);
      const response = await axios.delete(
        `http://localhost:5001/api/tasks/${id}?rapportId=${rapport_id}`
      );
      if (response.status === 200) {
        const newTasks = Tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
        console.log("task deleted successfully");
      } else {
        console.log("error");
      }
    }
  };
  const handleSendReport = async () => {
    const result = await Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Envoyer",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          `http://localhost:5001/api/chef/sendreport?chefId=${user.chefId}`,
          {
            userId: user.id,
            rapportId: rapport_id,
          }
        );

        if (response.status === 200) {
          console.log("report sent successfully");
          Swal.fire("Rapport envoyé avec succès!", "", "success");
        }
      } catch (error) {
        console.error("Error:", error);
        let errorMessage = "Erreur lors de l'envoi du rapport";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        Swal.fire(errorMessage, "", "error");
      }
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setEditTask(true);
  };
  const handleTaskCard = (task) => {
    setTask(task);
    setTaskCard(true);
  };
  const [search, setSearch] = useState("");
  const hanleSearchTask = (value) => {
    setSearch(value);
  };
  return (
    <>
      <div className="wrapperTable">
        <div className="rapport-desc">
          <div
            className="back-button"
            onClick={() => {
              back_button(!state);
              setRapportId("");
              setRapportNom("");
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
          <div className="reportName">
            <p>
              Nom Rapport : <a style={{ fontWeight: "bold" }}>{rapport_nom}</a>{" "}
            </p>

            <div className="btn-send">
              <button onClick={() => handleSendReport()}>
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Envoyer</span>
              </button>
            </div>
          </div>
        </div>
        <div className="table-head">
          <div className="left">Tâche</div>

          <div className="search">
            <input
              type="search"
              className="search-input"
              placeholder="Rechercher..."
              onChange={(e) => {
                hanleSearchTask(e.target.value);
              }}
            ></input>
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
          {/* table can be a seperate component if needed */}
          <table className="tableaux-rapport">
            <thead>
              <tr className="elhead">
                <th> Projet</th>
                <th>Nom</th>

                <th>Date de publication</th>

                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Tasks?.filter((task) => {
                return search.toLowerCase() === ""
                  ? task
                  : task.name.toLowerCase().startsWith(search.toLowerCase());
              }).map((task, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="task-row"
                >
                  <td onClick={() => handleTaskCard(task)}>{task.project}</td>
                  <td onClick={() => handleTaskCard(task)}>{task.name}</td>

                  <td onClick={() => handleTaskCard(task)}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>

                  {/* //change to date later */}
                  <td>
                    <div className="btn-edit">
                      <div
                        className="button-container"
                        onClick={() => handleTaskCard(task)}
                      >
                        <button
                          style={{
                            backgroundColor:
                              task.status === "En cours"
                                ? "#d8b339"
                                : task.status === "Validé"
                                ? "#00a36d"
                                : task.status === "Refusé"
                                ? "#db3434"
                                : "transparent",
                          }}
                        >
                          {task.status}
                        </button>
                      </div>
                      {hoveredRow === index && (
                        <div
                          className="edit-icon"
                          onClick={() =>
                            setOpenOptions(openOptions === index ? null : index)
                          }
                          onMouseLeave={() => setOpenOptions(null)}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                          {openOptions === index && (
                            <div className="options-list">
                              <button onClick={() => handleEditTask(task)}>
                                Modify
                              </button>
                              <hr />
                              <button
                                onClick={() => handleDeleteTask(task._id)}
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
            </tbody>
          </table>
          <div className="ena"></div>
        </div>

        <div className="footer-table">
          <button
            type="button"
            className="button"
            onClick={() => setAddTask(true)}
          >
            <span className="button_text">
              Ajouter tache
              <span className="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Maintable;
