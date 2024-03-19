import React from "react";
import "../App.css";
import Header from "../components/Header/Header";
import SignUpp from "../components/SignUp/SignUp";
function SignUp() {
  return (
    <>
      <div className="App" />
      <Header />
      <div className="Table">
        <SignUpp />
      </div>
    </>
  );
}

export default SignUp;
