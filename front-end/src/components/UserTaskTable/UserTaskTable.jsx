import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserTaskTable = ({taskClicked,setTaskClicked,rapportId,setRapportId}) => {
  const [Tasks, setTasks] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `http://localhost:5001/api/tasks?rapport_id=${rapportId}`
      );
      if (response) {
        setTasks(response.data);
        console.log(response.data)
      } else {
        console.log("error");
      }
    };
    fetchTasks();
  }, []);
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
          {/* <button> click </button> */}
        </div>

        
      </div>
    </>
  )
}

export default UserTaskTable