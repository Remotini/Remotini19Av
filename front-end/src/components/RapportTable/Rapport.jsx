import React, { useEffect, useState } from "react";
import "./Rapport.css";
import { data } from "./data";
import Maintable from "../Maintable/Maintable";
function Rapport({ addTask, setAddTask }) {
  const handleTaskRapport = () => {
    setClickedTask(!clickedTask);
  };
  const [clickedTask, setClickedTask] = useState(false);
  return (
    <>
      {!clickedTask ? (
        <div className="rap-wrapperTable">
          <div className="rapport-desc">Rapport des taches</div>
          <p>aa</p>
          <div className="rap-table-head">
            {/* <div className="left">Taches</div> */}
            <div className="rap-search">
              <input
                type="search"
                className="rap-search-input"
                placeholder="Rechercher..."
              ></input>
              <span className="rap-plus-icon" onClick={() => setAddTask(true)}>
                +
              </span>
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

          <div className="rap-table">
            {/* table can be a seperate component if needed */}

            <table className="rap-tableaux-rapport">
              <tr className="rap-elhead">
                <th> Rapport</th>
              </tr>
              <tbody>
                {data.map((rapport, index) => (
                  <tr key={index}>
                    <td onClick={() => handleTaskRapport()}>
                      {rapport.NomRapport}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Maintable />
      )}
    </>
  );
}
export default Rapport;
