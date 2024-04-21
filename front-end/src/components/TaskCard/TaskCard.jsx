import { useState, useContext } from "react";
import "./TaskCard.css";
import CommentsUser from "../CommentsUser/CommentsUser";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const TaskCard = ({ task, onClose, update, setUpdate }) => {
  const { user } = useContext(AuthContext);

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
  const handleStatusTask = async (status, id) => {
    const result = await Swal.fire({
      title: status === "Validé" ? "Approuver la tache" : "Refuser la tache",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",

      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
      backdrop: `
      rgba(0,0,0,0.4)
      url("https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif")
      center center
      no-repeat
      `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      stopKeydownPropagation: false,
      showCloseButton: false,
      showLoaderOnConfirm: true,

      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      },
    });

    if (result.isConfirmed) {
      const response = await axios.patch(
        `http://localhost:5001/api/chef/changeStatusTask`,
        {
          taskId: id,
          status: status,
        }
      );
      if (response.status === 200) {
        console.log("task changed");
        setUpdate(!update);
        Swal.fire({
          title: "Approuvé!",
          text: "La tache a été approuvée.",
          icon: "success",
          customClass: {
            container: "swal-container-success",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-confirm-button",
            cancelButton: "swal-cancel-button",
          },
        });
        onClose();
      } else {
        console.log("error");
      }
    }
  };
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
          {!task.file && (
            <>
              <strong>Fichier: </strong>
              <p>Il n'ya aucun fichier importé</p>
            </>
          )}
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
      <div className="footer-taskCard">
        {user.role === "Chef" && (
          <div className="task-actions">
            <button
              onClick={() => {
                handleStatusTask("Refusé", task._id);
              }}
              className="refuser"
            >
              Refuser
            </button>
            <button
              onClick={() => {
                handleStatusTask("Validé", task._id);
              }}
              className="valider"
            >
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
