import React from "react";
import "./TaskCard.css";
//
import CommentsUser from "../CommentsUser/CommentsUser";

const TaskCard = ({ task, onClose }) => {
  return (
    <>
      <div className="task-card">
        <CommentsUser />
      </div> // maghyr el css khater / ken bech njibou el css bech tet
    </>
  );
};

export default TaskCard;
