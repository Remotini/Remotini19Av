import React from "react";
import "./TaskCard.css";
import CommentsUser from "../CommentsUser/CommentsUser";
const TaskCard = ({ task, onClose }) => {
  const comments = [
    {
      id: 1,
      text: 'This is the first comment',
      children: [
        {
          id: 2,
          text: 'This is a reply to the first comment',
          children: [
            {
              id: 3,
              text: 'This is a reply to the reply',
              children: []
            }
          ]
        },
        {
          id: 4,
          text: 'This is another reply to the first comment',
          children: []
        }
      ]
    },
    {
      id: 5,
      text: 'This is the second comment',
      children: []
    }
  ]
  return (
    <div className="task-card">
      <div className="header-TaskCard">
        <div className="task-name">{task.name}</div>
        <span onClick={onClose}>X</span>
      </div>
      <br />
      <hr />
      <br />
      <div className="task-info">
        <p className="task-description">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="publication-date">
          <strong>Date de publication:</strong> {new Date(task.createdAt).toLocaleString()}
        </p>
         
        <CommentsUser />
      </div>
    </div>
  );
};

export default TaskCard;
