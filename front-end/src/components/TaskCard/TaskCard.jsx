import { useState } from "react";
import "./TaskCard.css";
import CommentsUser from "../CommentsUser/CommentsUser";
const TaskCard = ({ task, onClose }) => {
  console.log("task", task);
  const [voir, getVoir] = useState(false);
  const comments = [
    {
      id: 1,
      text: "This is the first comment",
      children: [
        {
          id: 2,
          text: "This is a reply to the first comment",
          children: [
            {
              id: 3,
              text: "This is a reply to the reply",
              children: [],
            },
          ],
        },
        {
          id: 4,
          text: "This is another reply to the first comment",
          children: [],
        },
      ],
    },
    {
      id: 5,
      text: "This is the second comment",
      children: [],
    },
  ];
  return (
    <div className="task-card">
      <div className="header-TaskCard">
        <div className="task-name">
          <div className="task-wrap-name">
            <span class="material-symbols-outlined">task</span>
            <h3>{task.name}</h3>
            <p
            style={{
              color:
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
          </p>
          </div>
        </div>
        <div className="close-icon">
          <span
            onClick={() => {
              onClose && onClose();
              getVoir(true);
            }}
            class="material-symbols-outlined"
          >
            close
          </span>
        </div>

        <br />
        <hr />
      </div>
      <br />
      <div className="task-info">
        <p className="task-project">
          <strong>Nom du Projet:</strong> {task.project}
        </p>
        <p className="task-description">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="publication-date">
          <strong>Date de publication:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <p className="task-status">
          {!task.file&&<>
          <strong>Fichier: </strong>
          <p>Il n'ya aucun fichier importé</p>
          </>
          }
        </p>
        {task.file && (
          <div className="file-display">
            <div className="file-title">
            
              <strong>Fichier:</strong>
            </div>
            <br />

            {voir && (
              <div className="aperçu">
                <a
                  href={`http://localhost:5001/images/${task.file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`http://localhost:5001/images/${task.file}`}
                    alt="file"
                  />
                </a>
                <span
                  onClick={() => getVoir(false)}
                  class="material-symbols-outlined"
                >
                  close
                </span>
              </div>
            )}
            <div className="download-button">
              <a onClick={() => getVoir(!voir)}>Voir Aperçu</a>
            </div>
          </div>
        )}
      </div>
      <CommentsUser />
      <div className="footer-taskCard"></div>
    </div>
  );
};

export default TaskCard;
