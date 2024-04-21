import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UserTaskTable.css";
import Swal from "sweetalert2";


const UserTaskTable = ({
  taskClicked,
  setTaskClicked,
  rapportId,
  setRapportId,
  setTask,
  openTaskCard,
}) => {
  const [Tasks, setTasks] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `http://localhost:5001/api/tasks?rapport_id=${rapportId}`
      );
      if (response) {
        setTasks(response.data);
        console.log(response.data);
      } else {
        console.log("error");
      }
    };
    fetchTasks();
  }, [update]);
  const handleStatusTask = async (status, id) => {
    const result = await Swal.fire({
      title: status==="Validé" ? "Approuver la tache" : "Refuser la tache",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      const response = await axios.patch(
        `http://localhost:5001/api/chef/changeStatusTask`,
        {
          taskId: id,
          status: status,
        }
      );
      if (response.status === 200) {
        console.log("task changed");
        setUpdate(!update);
        Swal.fire("Approuvé!", "La tache a été approuvée.", "success");
        
      } else {
        console.log("error");
      }
    }
  };

  const handlTaskCard = (task) => {
    setTask(task);
    openTaskCard();
  };

  return (
    <>
      <div className="wrapperTable">
        <div className="rapport-desc">
          <div
            className="back-button"
            onClick={() => {
              setTaskClicked(!taskClicked);
              setRapportId("");
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
                  className="user-row"
                >
                  <td onClick={()=>handlTaskCard(task)}>{task.project}</td>
                  <td onClick={()=>handlTaskCard(task)}>{task.name}</td>

                  <td onClick={()=>handlTaskCard(task)}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>

                  {/* //change to date later */}
                  <td onClick={()=>handlTaskCard(task)}>
                    <div className="btn-edit-user">
                      <div
                        className="button-container"
                        
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
                      <div className="rapped-icons">
                        {hoveredRow === index && (
                          <div
                            className="approve-icon"
                            onClick={() => setOpenOptions()}
                            onMouseLeave={() => setOpenOptions(null)}
                          >
                            <button
                              onClick={() =>
                                handleStatusTask("Validé", task._id)
                              }
                            >
                              <span class="material-symbols-outlined">
                                done
                              </span>
                            </button>
                          </div>
                        )}
                        {hoveredRow === index && (
                          <div
                            className="desapprove-icon"
                            onClick={() => setOpenOptions()}
                            onMouseLeave={() => setOpenOptions(null)}
                          >
                            <button
                              onClick={() =>

                                handleStatusTask("Refusé", task._id)
                              }
                            >
                              <span class="material-symbols-outlined">
                                close
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ena"></div>
        </div>

        <div className="footer-table">{/* <button> click </button> */}</div>
      </div>
    </>
  );
};

export default UserTaskTable;
