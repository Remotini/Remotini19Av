import React, { useState } from 'react'

const EditTask = ({ editTask, setEditTask,rapport}) => {
    const[newRapport,setNewRapport]=useState(rapport)
    
  return (
    <div className="add-task-container">
      <form className="form">
        <div className="heading">
          <p className="title">Modifier un rapport </p>
          <button className="Btnn" onClick={() => setEditTask(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <label htmlFor="reportName" className="label">
          <span>Nom du rapport</span>
          <input
            required
            type="text"
            className="input"
            id="reportName"
            defaultValue={rapport.nom}
            
            />
        </label>
        <div className="header-tache">
          <label htmlFor="firstname" className="label-tache">
            <span>Description</span>
            <input required type="text" className="input" id="firstname" defaultValue={rapport.description} />
          </label>
          <label htmlFor="project" className="label-projet">
            <span>Nom du projet</span>
            <select name="project" id="" className="project-selection">
              <option value="projet1">projet1</option>
              <option value="projet2">projet2</option>
              <option value="projet3">projet3</option>
              <option value="projet4">projet4</option>
              <option value="projet5">projet5</option>
            </select>
          </label>
        </div>

        <button className="submit">Modifier</button>
      </form>
    </div>
  )
}

export default EditTask