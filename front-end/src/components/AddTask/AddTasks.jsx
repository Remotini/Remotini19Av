import React from "react";
import "./AddTask.css";
import { FaUpload } from "react-icons/fa";

const AddTaks = ({ addTask, setAddTask }) => {
  const date = new Date();
  const [newTask, setNewTask] = useState({
    nom: "",
    date: "",
    description: "",
  });
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const data = await response.json();
        setRapports((prevRapports) => [...prevRapports, data]);
        setNewTask({
          nom: "",
          date: "",
          description: "",
        });
        setAddTask(false);
      } else {
        console.log("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  return (
    <div className="add-task-container">
      <form className="form">
        <div className="heading">
          <p className="title">Ajouter une tâche </p>
          <button className="Btnn" onClick={() => setAddTask(false)}>
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
            <input required type="text" className="input" id="firstname" />
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
            placeholder="Ajouter une description"
          ></textarea>
        </label>

        <label htmlFor="dueDate" className="label">
          <span>Date</span>
          <input
            required
            type="text"
            className="input"
            id="date"
            defaultValue={date.toLocaleDateString()}
            readOnly
          />
        </label>
        <button className="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddTaks;
