import React, { useState } from "react";
import "./CommentsUser.css";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import Com from "./Com";
function CommentsUser() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      date: "12/12/2021",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      children: [
        {
          id: 2,
          user: "iyeeddd grassi",
          date: "12/12/2021",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          children: [
            {
              id: 3,
              user: "Dabbech",
              date: "12/12/2021",
              content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
              children: [
                {
                  id: 4,
                  user: "Didosa",
                  date: "12/12/2021",
                  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                  children: [
                    {
                      id: 5,
                      user: "DabbechDiddosaa",
                      date: "12/12/2021",
                      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
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
    <div className="allIn" >
      <Com comment={comment} isChild={false} />
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
    //hedha el nesting children kifeh bech ykoun ya dabbouch 
    // {comments.map((comment) => (
    //   <div key={comment.id}>
    //     <h2>{comment.user}</h2>
    //     <p>{comment.date}</p>
    //     <p>{comment.content}</p>
    //     {comment.children && comment.children.map((child) => (
    //       <div key={child.id}>
    //         <h3>{child.user}</h3>
    //         <p>{child.date}</p>
    //         <p>{child.content}</p>
    //       </div>
    //     ))}
    //   </div>
    // ))}

/* <div className="rap-comments">
  {comments.map((comment) => (
    <div className="comment" key={comment.id}>
      <div className="comment-user">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
        <div className="comment-user-info">
          <span className="comment-user-name">{comment.user}</span>
          <p>{comment.date}</p>
        </div>
      </div>
      <div>
        <p className="comment-content">
          {" "}
          <p>{comment.content}</p>{" "}
          <span>
            <IoIosArrowDropdownCircle />{" "}
          </span>
        </p>
        <div className="options">
          <h4>reply</h4>
          <h4>Edit</h4>
        </div>
      </div>
      {comment.children && comment.children.map((child) => (
        <div className="comment-child" key={child.id}>
          <div className="comment-user">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
            <div className="comment-user-info">
              <span className="comment-user-name">{child.user}</span>
              <p>{child.date}</p>
            </div>
          </div>
          <div>
            <p className="comment-content">
              {" "}
              <p>{child.content}</p>{" "}
              <span>
                <IoIosArrowDropdownCircle />{" "}
              </span>
            </p>
            <div className="options">
              <h4>reply</h4>
              <h4>Edit</h4>
            </div>
          </div>
        </div>
      ))}
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
</div> */





    // <div className="rap-comments">
    //   {comments.map((comment) => (
    //     <div className="comment" key={comment.id}>
    //       <div className="comment-user">
    //         <img
    //           src="https://www.w3schools.com/howto/img_avatar.png"
    //           alt="avatar"
    //         />
    //         <div className="comment-user-info">
    //           <span className="comment-user-name">{comment.user}</span>
    //           <p>{comment.date}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <p className="comment-content">
    //           {" "}
    //           <p>{comment.content}</p>{" "}
    //           <span>
    //             <IoIosArrowDropdownCircle />{" "}
    //           </span>
    //         </p>
    //         <div className="options">
    //           <h4>reply</h4>
    //           <h4>Edit</h4>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    //   <form onSubmit={handleCommentSubmit} className="comment-form">
    //     <textarea
    //       value={newComment}
    //       onChange={(e) => setNewComment(e.target.value)}
    //       required
    //       className="comment-textarea"
    //     />
    //     <button type="submit" className="comment-button">
    //       Commenter
    //     </button>
    //   </form>
    // </div>
  );
}

export default CommentsUser;
