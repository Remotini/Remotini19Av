import React, { useState } from "react";
import "./CommentsUser.css";
import { IoIosArrowDropdownCircle,IoIosArrowDropupCircle } from "react-icons/io";

function CommentsUser() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      date: "12/12/2021",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      id: 2,
      user: "Jane Doe",
      date: "13/12/2021",
      content: "Quo dolores, fugit perspiciatis officia corporis molestiae.",
    },
    {
      id: 3,
      user: "Hmed Satour",
      date: "13/12/2021",
      content: "Quo dolores, fugit perspiciatis officia corporis molestiae.",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  // const {insertNode,editNode}=useNode();
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newCommentData = {
      id: comments.length + 1,
      user: "New User",
      date: new Date().toLocaleDateString(),
      content: newComment,
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  return (
    <div className="rap-comments">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="comment-user">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className="comment-user-info">
              <h5>{comment.user}</h5>
              <p>{comment.date}</p>
            </div>
          </div>
          <div>
          <p className="comment-content"> <p>{comment.content}</p> <span><IoIosArrowDropdownCircle/> </span></p>
          <div className="options">
            <h4 >reply</h4> 
            <h4>Edit</h4>
          </div>
          
          </div>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          className="comment-textarea"
        />
        <button type="submit" className="comment-button">
          Commenter
        </button>
      </form>
    </div>
  );
}

export default CommentsUser;
