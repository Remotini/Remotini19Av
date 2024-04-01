import React, { useState } from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import "../App.css";
import Footer from "../components/Footer/Footer";
import Rapport from "../components/RapportTable/Rapport";
import AddTaks from "../components/AddTask/AddTasks";
import EditReport from "../components/EditTask/EditTask";
function Home() {
  const [addTask, setAddTask] = useState(false);
  const [editReport, setEditReport] = useState(false);
  const [rapport, setRapport] = useState(null);
  const [getrapportId, setGetRapportId] = useState("");
  const [updatedTask, setUpdatedTask] = useState(false);

  return (
    <>
      {addTask ? (
        <AddTaks
          addTask={addTask}
          setAddTask={setAddTask}
          getrapportId={getrapportId}
          setUpdatedTask={setUpdatedTask}
        />
      ) : null}
      {editReport ? (
        <EditReport
          editReport={editReport}
          setEditReport={setEditReport}
          rapport={rapport}
        />
      ) : null}
      <div className={"All"}>
        <div className="App" />
        <Header />
        <div className="center">
          <div className="the-nav">
            <NavBar />
          </div>
          <Rapport
            addTask={addTask}
            setAddTask={setAddTask}
            editReport={editReport}
            setEditReport={setEditReport}
            setRapport={setRapport}
            getRapportId={setGetRapportId}
            updatedTask={updatedTask}
          />
        </div>
        {addTask && <div className="All-b"></div>}
        {editReport && <div className="All-b"></div>}
        <div className="ft">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
