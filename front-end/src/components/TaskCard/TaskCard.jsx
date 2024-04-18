import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task}) => {
  return (
    <div className="task-card">
      <div className="task-name">{task.name}</div>
      <hr />
      <div className="task-info">
        <p className="task-description">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="publication-date">
          <strong>Date de publication:</strong> {task.createdAt}
        </p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default TaskCard;
