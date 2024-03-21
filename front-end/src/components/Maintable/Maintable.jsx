import React, { useEffect, useState } from "react";
import "./Maintable.css";
import { data } from "./data";
function Maintable() {
  const [tableData, setTableData] = useState(data);
  return (
    <div className="table">
      <div className="table-heading">
        <div className="description">Tâches</div>
        <div className="right-m">
          <input
            type="search"
            className="search-input"
            placeholder="Type here..."
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
      {/* table can be a seperate component if needed */}
      <table className="tableaux-rapport">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.familyName}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Maintable;
