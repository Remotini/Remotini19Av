import React, { useState, useEffect, useContext } from "react";
import "./EditTask.css";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
const EditTask = ({
  task,
  setEditTask,
  setUpdatedTask,
  updatedTask,
  nameReport,
}) => {
  const date = new Date();
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);
  const [newTask, setNewTask] = useState({
    nom: task.name,
    date: new Date(),
    description: task.description,
    project: task.project,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/projects?userId=${user.id}`
        );
        if (response.status === 200) {
          const data = response.data;
          console.log("Projects fetched successfully:", data);
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);
  const handleEditTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5001/api/tasks/${task._id}`,
        {
          name: newTask.nom,
          description: newTask.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log("Task updated successfully:", data);
        setUpdatedTask(!updatedTask);
        setNewTask({
          nom: "",
          date: "",
          description: "",
          project: "",
        });
        setEditTask(false);

        Swal.fire({ icon: "success", title: "Tâche modifiée avec succès" });
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
            defaultValue={nameReport}
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
              {projects.map((project) => (
                <option key={project._id} value={project.name}>
                  {project.name}
                </option>
              ))}
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
          Modifier
        </button>
      </form>
    </div>
  );
};

export default EditTask;
