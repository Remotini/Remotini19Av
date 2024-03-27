import React, { useEffect, useState } from "react";
import "./Maintable.css";
import { data } from "./data";
function Maintable() {
  const [tableData, setTableData] = useState(data);
  return (
    <div className="wrapperTable">
      <div className="rapport-desc">Rapport des taches</div>
      <p>aa</p>
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
          <span className="plus-icon">+</span>
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
          <tr className="elhead">
            <th> Projet</th>
            <th>Nom</th>
            <th>Date de publication</th>
            <th>Date fin réalisation</th>
            <th>Status</th>
          </tr>
          <tbody>
            {data.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.projectName}</td>

                <td>{task.publicationDate}</td>
                <td>{task.deadline}</td>
                <td>
                  <div className="button-container">
                    <button
                      style={{
                        backgroundColor:
                          task.status === "en cours"
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
    </div>
  );
}

export default Maintable;
