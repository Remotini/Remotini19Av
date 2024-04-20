import React, { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import unknown from "../../assets/unknown-user.png";
import "./Com.css";
function Com({ comment, isChild }) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  console.log("is children, ", isChild);
  return (
    <div className={isChild ? "child-comment" : "comment"} key={comment.id}>
      <div className="comment-user">
        <img src={unknown} alt="" />
        <div className="comment-user-info">
          <span className="comment-user-name">{comment.user}</span>
          <p>{comment.date}</p>
        </div>
      </div>
      <div>
        <p className="comment-content">
          <p>{comment.content}</p>
          <span onClick={toggleReplies}>
            {showReplies ? (
              <IoIosArrowDropupCircle />
            ) : (
              <IoIosArrowDropdownCircle />
            )}
          </span>
        </p>
        <div className="options">
          <h4 onClick={toggleReplyForm}>reply</h4>
          <h4>Edit</h4>
        </div>
        {showReplyForm && (
          <form className="reply-form">
            <input type="text" placeholder="Write a reply..." />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      {showReplies &&
        comment.children &&
        comment.children.map((child) => (
          <div className="child">
            <Com comment={child} isChild={true} />
          </div>
        ))}
    </div>
  );
}

export default Com;
