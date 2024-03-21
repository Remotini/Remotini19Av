import React from "react";
import "../App.css";
import Header from "../components/Header/Header";
import SignUpp from "../components/SignUp/SignUp";
function SignUp() {
  return (
    <>
      <div className="flex-two-table">
        <div className="left-design"></div>
        <div className="Table">
          <SignUpp />
        </div>
      </div>
    </>
  );
}

export default SignUp;
