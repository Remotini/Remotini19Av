import React, { useState } from "react";
import "./EditTask.css";
import { FaUpload } from "react-icons/fa";

const EditTask = ({ task, setEditTask, setUpdatedTask }) => {
  const date = new Date();

  const [newTask, setNewTask] = useState({
    nom: task.nom,
    date: new Date(),
    description: task.description,
    project: "projet1",
    rapport_id: task.rapport_id,
  });

  const handleEditTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5001/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Task updated successfully:", data);
        setUpdatedTask(true);
        setNewTask({
          nom: "",
          date: "",
          description: "",
          project: "",
          rapport_id: "",
        });
        setEditTask(false);
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to update the task here
    console.log("Task updated:", task);
  };

  return (
    <div className="add-task-container">
      <form className="form" onSubmit={handleEditTask}>
        <div className="heading">
          <p className="title">Modifer une tâche </p>
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
            defaultValue={"Rapport 1"}
            readOnly // Make it read-only if it's set by default
          />
        </label>
        <div className="header-tache">
          <label htmlFor="firstname" className="label-tache">
            <span>Nom tache</span>
            <input
              required
              type="text"
              className="input"
              id="firstname"
              value={newTask.nom}
              onChange={(e) => setNewTask({ ...newTask, nom: e.target.value })}
            />
          </label>
          <label htmlFor="project" className="label-projet">
            <span>Nom du projet</span>
            <select
              name="project"
              id=""
              className="project-selection"
              value={newTask.project}
              onChange={(e) =>
                setNewTask({ ...newTask, project: e.target.value })
              }
            >
              <option value="projet1">projet1</option>
              <option value="projet2">projet2</option>
              <option value="projet3">projet3</option>
              <option value="projet4">projet4</option>
              <option value="projet5">projet5</option>
            </select>
          </label>
        </div>
        <div className="label-screenshot">
          <span>Ajouter un(des) fichier(s):</span>
          <input
            type="file"
            accept="image/*"
            className="input-file"
            id="screenshot"
          />
          <label htmlFor="screenshot" className="file-label">
            <FaUpload /> Importer
          </label>
        </div>
        <label htmlFor="description" className="label">
          <span>Description</span>
          <textarea
            name=""
            cols="30"
            rows="5"
            className="input"
            id="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          ></textarea>
        </label>

        <label htmlFor="dueDate" className="label">
          <span>Date</span>
          <input
            required
            type="text"
            className="input"
            id="date"
            value={date.toDateString()}
            readOnly
          />
        </label>
        <button className="submit" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default EditTask;
