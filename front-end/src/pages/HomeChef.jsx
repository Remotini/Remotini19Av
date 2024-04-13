import React from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";

import Footer from "../components/Footer/Footer";
import UserTable from "../components/userTable/userTable";

const HomeChef = () => {
  console.log("HomeChef");
  return (
    <div className="All">
      <div className="App" />
      <Header />
      <div className="center">
        <div className="the-nav">
          <NavBar />
        </div>
        <div className="profile_pagedes">
          <UserTable />
        </div>
      </div>
      <div className="ft">
        <Footer />
      </div>
      
    </div>
  );
};

export default HomeChef;
