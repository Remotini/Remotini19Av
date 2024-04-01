import React, { useEffect, useState } from "react";
import "./Maintable.css";
import axios from "axios";
function Maintable(props) {
  const {
    rapport_nom,
    rapport_id,
    back_button,
    state,
    setAddTask,
    updatedTask,
  } = props;
  console.log(state);
  const [Tasks, setTasks] = useState([]);
  const [hoverPlus, setHoverPlus] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `http://localhost:5001/api/reports/${rapport_id}`
      );
      if (response) {
        console.log(Tasks);
        setTasks(response.data.tasks);
      } else {
        console.log("error");
      }
    };

    fetchTasks();
  }, [updatedTask]);

  return (
    <>
      <div className="wrapperTable">
        <div className="rapport-desc">Rapport des taches : </div>
        <p>{rapport_nom}</p>

        <div className="table-head">
          {/* <div className="left">Taches</div> */}
          <select name="" id="">
            <option value="">Toutes les tâches</option>
            <option value="">Tâches en cours</option>
            <option value="">Tâches finies</option>
          </select>
          <div className="search">
            <input
              type="search"
              className="search-input"
              placeholder="Rechercher..."
            ></input>
            <span
              className="rap-plus-icon"
              onClick={() => setAddTask(true)}
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
            {hoverPlus && <span className="ajoutstyle">Ajouter une tache</span>}
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
                <th>Date fin réalisation</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {Tasks.map((task, index) => (
                <tr key={index}>
                  <td>{rapport_nom}</td>
                  <td>{task.nom}</td>
                  <td>{task.datePub}</td>
                  <td>{task.dateComp ? "yes " : "non"}</td>
                  {/* //change to date later */}
                  <td>
                    <div className="button-container">
                      <button
                        style={{
                          backgroundColor:
                            task.status === "En cours"
                              ? "#d8b339"
                              : task.status === "validé"
                              ? "#00a36d"
                              : task.status === "refusé"
                              ? "#db3434"
                              : "transparent",
                        }}
                      >
                        {task.status}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="back-button" onClick={() => back_button(!state)}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
      </div>
    </>
  );
}

export default Maintable;
