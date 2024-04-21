import React, { useState } from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import PieChart from "../components/PieChart/PieChart";
import Footer from "../components/Footer/Footer";
import UserTable from "../components/UserTable/UserTable";
import TaskCard from "../components/TaskCard/TaskCard";

const HomeChef = () => {
  const [task, setTask] = useState(null);
  const [taskCard, setTaskCard] = useState(false);
  const [update, setUpdate] = useState(false);

  return (
    <>
      {taskCard ? (
        <div className="TaskCard">
          <TaskCard
            task={task}
            onClose={() => setTaskCard(false)}
            update={update}
            setUpdate={setUpdate}
          />
        </div>
      ) : null}
      <div className="All">
        <div className="App" />
        <Header />
        <div className="center">
          <div className="the-nav">
            <NavBar />
          </div>
          <div className="profile_pagedes">
            <UserTable
              openTaskCard={() => setTaskCard(true)}
              setTask={setTask}
              update={update}
              setUpdate={setUpdate}
            />
            {/* <PieChart /> */}
          </div>
        </div>
        <div className="ft">
          <Footer />
        </div>
        {taskCard && <div className="All-b"></div>}
      </div>
    </>
  );
};

export default HomeChef;
