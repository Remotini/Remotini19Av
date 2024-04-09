import React, { useEffect, useState } from "react";
import "./Maintable.css";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
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
  useEffect(() => {
    const fetchTasks = async () => {
      console.log("rapport_id", rapport_id);
      const response = await axios.get(
        `http://localhost:5001/api/tasks?rapport_id=${rapport_id}`
      );
      console.log("response tasks ", response);
      if (response) {
        console.log(Tasks);
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
      console.log(id);
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
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setEditTask(true);
  };
  const handleTaskCard = (task) => {
    setTask(task);
    setTaskCard(true);
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
        </div>
        <div className="table-head">
          <div className="left">Taches</div>

          <div className="search">
            <input
              type="search"
              className="search-input"
              placeholder="Rechercher..."
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
              {Tasks?.filter((task) => task.active).map((task, index) => (
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
                                : task.status === "refusé"
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

        {/* <div
          className="back-button"
          onClick={() => {
            back_button(!state);
            setRapportId("");
            setRapportNom("");
          }}
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div> */}
      </div>
    </>
  );
}

export default Maintable;
