import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Pie } from "react-chartjs-2";
import Statistique from "../components/Statistique/Statist";
import { Chart as ChartJS } from "chart.js/auto";

function Stat() {
  // const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await axios.get("http://localhost:5001/api/tasks");
  //     if (response) {
  //       setTasks(response.data.tasks);
  //       console.log(tasks);
  //     } else {
  //       console.log("error");
  //     }
  //   };

  //   fetchTasks();
  // }, []);
  return (
    <div className="All">
      <div className="App" />
      <Header />
      <div className="center">
        <div className="the-nav">
          <NavBar />
        </div>
        <div className="stat_page">
          <Statistique />
        </div>
      </div>
      <div className="ft">
        <Footer />
      </div>
    </div>
  );
}

export default Stat;
