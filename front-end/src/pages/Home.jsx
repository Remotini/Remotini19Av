import React, { useState } from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Maintable from "../components/Maintable/Maintable";
import "../App.css";
import Footer from "../components/Footer/Footer";
import Rapport from "../components/RapportTable/Rapport";
import AddTaks from "../components/AddTask/AddTasks";
import EditReport from "../components/EditTask/EditTask";
function Home() {
  const [addTask, setAddTask] = useState(false);
  const[editReport,setEditReport]=useState(false);
  const[rapport,setRapport]=useState(null)
  return (
    <>
      {addTask ? <AddTaks addTask={addTask} setAddTask={setAddTask} /> : null}
      {editReport ? <EditReport editReport={editReport} setEditReport={setEditReport} rapport={rapport} /> : null}
      <div className={"All"}>
        <div className="App" />
        <Header />
        <div className="center">
          <div className="the-nav">
            <NavBar />
          </div>
          <Rapport addTask={addTask} setAddTask={setAddTask} editReport={editReport} setEditReport={setEditReport} setRapport={setRapport}/>
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
